import base64
import os
import logging
from flask import Flask, request, jsonify

import firebase_admin
from firebase_admin import credentials, auth, db, storage
import datetime
from dotenv import load_dotenv
import requests  
from pyonemap import OneMap

import telebot
from telebot import types
from flask_cors import CORS
import urllib.parse


from delivery_volunteer import *
from storage_volunteer import *
from donor import *
from beneficiary import *

# Initialize Flask server
server = Flask(__name__)

TELEGRAM_API_TOKEN= os.getenv("TELEGRAM_API_TOKEN")
ONE_MAP_TOKEN = os.getenv("ONE_MAP_TOKEN")
bot = telebot.TeleBot(TELEGRAM_API_TOKEN, threaded=False)
onemap = OneMap(ONE_MAP_TOKEN)

CORS(server)

# Load the .env file
load_dotenv()

# Fetch the service account key JSON file contents
cred = credentials.Certificate('settings.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'storageBucket': 'ms-cfg.appspot.com',
    'databaseURL': os.getenv("DATABASE_URL")
   
})
bucket = storage.bucket()

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@server.route('/add-food', methods=['POST'])
def add_food_posting():
    image_file = request.files.get('image')
    if not image_file:
        return jsonify({"error": "Missing image file"}), 400
    # Save image to Firebase Storage
    blob = bucket.blob(f"images/{image_file.filename}")
    blob.upload_from_file(image_file)
    blob.make_public()
    
    image = blob.public_url
    
    try:
        data = request.form.to_dict()
        required_fields = ['name', 'numOfMeals', 'preparedAt', 'consumeBy', 'recurring', 'selectedDays']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Store the food posting in the database
        prepared_at_date = datetime.datetime.strptime(data['preparedAt'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d')
        ref = db.reference(f'food_postings')
        data['image'] = image
        new_post_ref = ref.push(data)
        post_id = new_post_ref.key
        new_post_ref.update({ "donorListingId": post_id }) 
        logging.info(f'Food posting added successfully with ID: {post_id}')

        # Fetch all chat IDs associated with emails
        email_ref = db.reference('emails')
        emails_data = email_ref.get()

        if emails_data:
            # Send notification to each chat ID
            for encoded_email, chat_id in emails_data.items():
                try:
                    # Decode email for logging (optional)
                    decoded_email = base64.b64decode(encoded_email).decode()
                    logging.info(f'Sending notification to {decoded_email} (chat_id: {chat_id})')
                    
                    # Send notification to the chat_id
                    bot.send_message(chat_id, f"New food posting added: {data['name']}. Check it out!")
                except Exception as e:
                    logging.error(f"Failed to send message to chat_id {chat_id}: {e}")
        
        return jsonify({"data": new_post_ref.get() }), 201

    except Exception as e:
        logging.error(f"Failed to add food posting: {e}")
        return jsonify({"error": str(e)}), 500
    
@server.route('/delete-food', methods=['DELETE'])
def delete_food_donation():
    try:
        data = request.get_json()
        donation_id = data.get('donorListingId')
        
        if not donation_id:
            return jsonify({"error": "donorListingId is required"}), 400

        # Reference to the food_postings node
        ref = db.reference('food_postings')

        # Delete the specific food donation
        ref.child(donation_id).delete()

        logging.info(f'Food donation deleted successfully.')
        return jsonify({"message": "Food donation deleted successfully"}), 200

    except Exception as e:
        logging.error(f"Failed to delete food donation: {e}")
        return jsonify({"error": str(e)}), 500

@server.route('/get-food-donations', methods=['GET'])
def get_food_donations():
    try:
        # Get the donorId from the query parameters
        donor_id = request.args.get('donorId')
        if not donor_id:
            return jsonify({"error": "donorId query parameter is required"}), 400

        # Reference to the food_postings node
        ref = db.reference('food_postings')

        # Query to filter by donorId
        query = ref.order_by_child('donorId').equal_to(donor_id)

        # Fetch and prepare the results
        results = query.get()


        food_donations = []
        for key, value in results.items():
            food_donations.append({ **value })

        return jsonify({"food_donations": food_donations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@server.route('/get-food', methods=['GET'])
def get_food_postings():
    try:
        ref = db.reference('food_postings')
        food_postings = ref.get()
        if not food_postings:
            food_postings = {}
        logging.info('Food postings retrieved successfully.')
        return jsonify(food_postings), 200
    except Exception as e:
        logging.error(f"Failed to retrieve food postings: {e}")
        return jsonify({"error": str(e)}), 500

@server.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        roles = data.get('roles')  # An array of roles (e.g., ['Donor', 'Volunteer'])
        logging.debug("roles", roles)
        if not email or not password or not roles or not isinstance(roles, list):
            return jsonify({"error": "Missing email, password, or roles (roles must be an array)"}), 400

        # Create user with Firebase Admin SDK
        user = auth.create_user(
            email=email,
            password=password,
        )

        # Store user roles in Firebase Realtime Database
        user_ref = db.reference(f'users/{user.uid}')
        user_id = user_ref.key
        user_ref.set({
            'userId': user_id,
            'email': email,
            'roles': roles,
            'createdAt': datetime.datetime.now().isoformat(),
            'points': 0
        })

        # if delivery_volunteer is in roles we register them in /deliveryvolunteer reference
        
        if "deliveryvolunteer" in roles:
            deliveryVolunteerName = data.get('name')
            phone = data.get('phone')
            address = data.get('address')
            postalCode = data.get('postalCode')
            availableFrom = data.get('availableFrom')
            availableTo = data.get('availableTo')
            
            if not deliveryVolunteerName or not phone or not address or not postalCode or not availableFrom or not availableTo:
                logging.error(f"Failed to register delivery volunteer: {user.uid} due to incomplete info.")
            else: 
                res = register_delivery_volunteer(user.uid, deliveryVolunteerName, email, phone, address, postalCode, availableFrom, availableTo)
 
                if not(res):
                    logging.error(f"Failed to register delivery volunteer: {user.uid} due to incompleted info.")

        if "storagevolunteer" in roles:
            storageVolunteerName = data.get('name')
            phone = data.get('phone')
            address = data.get('address')
            postalCode = data.get('postalCode')
            availableFrom = data.get('availableFrom')
            availableTo = data.get('availableTo')
            storageCapacity = data.get('storageCapacity')
            
            if not storageVolunteerName or not phone or not address or not postalCode or not availableFrom or not availableTo or not storageCapacity:
                logging.error(f"Failed to register storage volunteer: {user.uid} due to incomplete info.")
            else: 
                res = register_storage_volunteer(user.uid, storageVolunteerName, email, phone, address, postalCode, availableFrom, availableTo, storageCapacity)
 
                if not(res):
                    logging.error(f"Failed to register storage volunteer: {user.uid} due to incompleted info2.")
        if "donor" in roles:
            donorName = data.get('name')
            phone = data.get('phone')
            address = data.get('address')
            postalCode = data.get('postalCode')
            email = data.get('email')
            organisationName = data.get('organisationName')
            
            if not donorName or not phone or not address or not postalCode or not email or not organisationName:
                logging.error(f"Failed to register donor: {user.uid} due to incomplete info.")
            else: 
                res = register_donor(user.uid, donorName, email, address, postalCode, phone, organisationName)
            
 
                if not(res):
                    logging.error(f"Failed to register donor: {user.uid} due to incompleted info.")
        
        if "beneficiary" in roles:
            beneficiaryName = data.get('name')
            phone = data.get('phone')
            address = data.get('address')
            postalCode = data.get('postalCode')
            email = data.get('email')
            contactPerson = data.get('contactPerson')
            
            if not beneficiaryName or not phone or not address or not postalCode or not email or not contactPerson:
                logging.error(f"Failed to register beneficiary: {user.uid} due to incomplete info.")
            else: 
                res = register_beneficiary(user.uid, beneficiaryName, email, address, postalCode, phone, contactPerson)
            
 
                if not(res):
                    logging.error(f"Failed to register beneficiary: {user.uid} due to incompleted info.")


        logging.info('User registered successfully with roles.')
        
        return jsonify({"message": "User registered successfully", "userId": user.uid}), 201
    except Exception as e:
        logging.error(f"Failed to register user: {e}")
        return jsonify({"error": str(e)}), 500


FIREBASE_WEB_API_KEY = os.getenv('FIREBASE_WEB_API_KEY')

def get_user(auth_header):
    if not auth_header:
        return jsonify({"error": "Authorization token is missing"}), 401

    id_token = auth_header.split(" ")[1]
    decoded_token = auth.verify_id_token(id_token)
    user_uid = decoded_token['uid']

    user = auth.get_user(user_uid)
    return user
 
@server.route('/orders/add', methods=['POST'])
def add_order():
    try:
        data = request.get_json()
        required_fields = ['originLocation', 'destinationLocation', 'pointsAvailable', 'numberOfMeals', 'donorListingId']
        location_fields = ['address', 'postalCode']
        
        auth_header = request.headers.get('Authorization')

        user = get_user(auth_header)
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        for loc in ['originLocation', 'destinationLocation']:
            for field in location_fields:
                if field not in data[loc]:
                    return jsonify({"error": f"Missing required field in {loc}: {field}"}), 400
        
        if not data['originLocation']['postalCode'] or not data['destinationLocation']['postalCode']:
            return jsonify({"error": "Postal code is required for both origin and destination locations."}), 400

        donorListingId = data['donorListingId']
        prepared_at_date = datetime.datetime.now().strftime('%Y-%m-%d')
        ref = db.reference(f'orders/{prepared_at_date}/{donorListingId}')
        new_order_ref = ref.push(data)
        order_id = new_order_ref.key
        new_order_ref.update({"orderId": order_id, "assigned": False, "assignedTo": None, "status": "pending", "userId": user.uid})

        # Retrieve the newly added order
        order_data = new_order_ref.get()

        logging.info(f"Order added successfully with orderId: {order_id}")
        return jsonify(order_data), 201
    except Exception as e:
        logging.error(f"Failed to add order: {e}")
        return jsonify({"error": str(e)}), 500

@server.route('/orders', methods=['GET'])
def get_orders():
    try:
        # Get query parameters
        date = request.args.get('date')
        donorListingId = request.args.get('donorListingId')

        if not date or not donorListingId:
            return jsonify({"error": "Missing required query parameters: 'date' and 'donorListingId'"}), 400

        # Fetch orders from Firebase based on date and donorListingId
        ref = db.reference(f'orders/{date}/{donorListingId}')
        orders = ref.get()

        if not orders:
            return jsonify({"message": f"No orders found for donorListingId: {donorListingId} on date: {date}"}), 404

        logging.info(f"Orders retrieved successfully for donorListingId: {donorListingId} on date: {date}")
        return jsonify(orders), 200

    except Exception as e:
        logging.error(f"Failed to retrieve orders for donorListingId {donorListingId} on date {date}: {e}")
        return jsonify({"error": str(e)}), 500


@server.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400

        # Firebase REST API URL for email/password sign-in
        url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_WEB_API_KEY}"

        # Data for the request
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }

        # Make a POST request to the Firebase Auth REST API
        response = requests.post(url, json=payload)
        response_data = response.json()

        # Check for errors in the response
        if 'error' in response_data:
            return jsonify({"error": response_data['error']['message']}), 400

        # Return user information and ID token
        return jsonify({
            "message": "Login successful",
            "idToken": response_data['idToken'],
            "refreshToken": response_data['refreshToken'],
            "expiresIn": response_data['expiresIn'],
            "userId": response_data['localId']
        }), 200
    except Exception as e:
        logging.error(f"Failed to log in user: {e}")
        return jsonify({"error": str(e)}), 500
    
@server.route('/current-user', methods=['GET'])
def get_current_user():
    try:
        auth_header = request.headers.get('Authorization')
        logger.info(f"Authorization Header: {auth_header}")

        if not auth_header:
            return jsonify({"error": "Authorization token is missing"}), 401

        id_token = auth_header.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token['uid']
        logger.info(f"ID Token: {id_token}")

        user = auth.get_user(user_uid)

        # Return the user details
        user_info = {
            "userId": user.uid,
            "email": user.email,
            "roles": db.reference(f'users/{user.uid}/roles').get()
        }

        return jsonify({"user": user_info}), 200

    except Exception as e:
        logging.error(f"Failed to retrieve current user: {e}")
        return jsonify({"error": "Invalid token or user not authenticated"}), 401

@server.route('/get-points', methods=['GET'])
def get_user_points():
    try:
        data = request.get_json()
        userid = data.get('userId')

        if not userid:
            return jsonify({"error": "userId parameter is required"}), 400
        
        ref = db.reference(f'users/{userid}')

        user_data = ref.get()
        user_points = user_data.get('points', 0)

        logging.info('User points retrieved successfully.')
        return jsonify(user_points), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# BOT STUFF
@bot.message_handler(commands=['attach'])
def register_user(message):
    chat_id = str(message.chat.id)
    msg = bot.reply_to(message, "Please enter your email address:")
    bot.register_next_step_handler(msg, process_email_step)

def process_email_step(message):
    email = message.text.lower()
    ref = db.reference()
    encoded_email = base64.b64encode(email.encode()).decode()
    chat_id = str(message.chat.id)
    email_ref = ref.child('emails').child(encoded_email)
    email_ref.set(chat_id)
    bot.send_message(message.chat.id, f"Thank you, it will be registered")
    
@server.route("/")
def webhook():
    bot.remove_webhook()
    server_uri = os.getenv("DEV_SERVER") + TELEGRAM_API_TOKEN
    logger.info(str(server_uri))
    bot.set_webhook(url=server_uri)
    return "!", 200

@server.route('/' + TELEGRAM_API_TOKEN, methods=['POST'])
def getMessage():
    try:
        # Read the raw data from Telegram
        raw_data = request.stream.read().decode("utf-8")
        logger.info(f"Raw incoming request data: {raw_data}")
        
        # Process the update
        update = telebot.types.Update.de_json(raw_data)
        
        # Check if 'update_id' exists before processing
        if hasattr(update, 'update_id'):
            bot.process_new_updates([update])
            return "OK", 200  # Correct tuple response with body and status
        else:
            logger.warning(f"Missing 'update_id' in update: {raw_data}")
            return jsonify({"error": "Missing 'update_id'"}), 400  # Return error as a valid JSON response with status code
    except Exception as e:
        logger.error(f"Error processing update: {e}")
        return jsonify({"error": "Failed to process update", "details": str(e)}), 500  # Handle exceptions with proper response
    
    return "OK", 200  # Ensure valid response is always returned
    
# Start the serverr
if __name__ == "__main__":
    server.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5001)), debug=True)


