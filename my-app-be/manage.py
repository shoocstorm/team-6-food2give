import os
import logging
from flask import Flask, request, jsonify

import firebase_admin
from firebase_admin import credentials, auth, db, storage
import datetime
from dotenv import load_dotenv
import requests  

from flask_cors import CORS

# Initialize Flask server
server = Flask(__name__)

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

# Define a simple route for the root URL
@server.route("/")
def index():
    return "Hello! The server is running.", 200


# Route to set data in Firebase Realtime Database
@server.route('/set-data', methods=['POST'])
def set_data():
    try:
        # Sample data to be set in Firebase
        data = {
            'name': 'Jane Doe',
            'age': 28,
            'city': 'Singapore'
        }
        
        # Reference to the database location (node)
        ref = db.reference('users/user1')
        
        # Set data in Firebase
        ref.set(data)
        
        logging.info('Data has been set successfully.')
        return jsonify({"message": "Data set successfully"}), 200
    except Exception as e:
        logging.error(f"Failed to set data: {e}")
        return jsonify({"error": str(e)}), 500


# Route to get data from Firebase Realtime Database
@server.route('/get-data', methods=['GET'])
def get_data():
    try:
        # Reference to the database location (node)
        ref = db.reference('users/user1')
        
        # Get data from Firebase
        data = ref.get()
        
        logging.info('Data retrieved successfully.')
        return jsonify(data), 200
    except Exception as e:
        logging.error(f"Failed to get data: {e}")
        return jsonify({"error": str(e)}), 500


@server.route('/scheduled-task', methods=['POST'])
def handle_scheduled_task():
    logging.info('Received scheduled task.')
    # Your scheduled task logic goes here
    return 'Task processed successfully', 200

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
        prepared_at_date = datetime.datetime.strptime(data['preparedAt'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d')
        ref = db.reference('food_postings')
        data['image'] = image
        new_post_ref = ref.push(data)
        post_id = new_post_ref.key
        logging.info(f'Food posting added successfully with ID: {post_id}')
        return jsonify({"message": "Food posting added successfully", "id": post_id}), 201
    except Exception as e:
        logging.error(f"Failed to add food posting: {e}")
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

        if not email or not password or not roles or not isinstance(roles, list):
            return jsonify({"error": "Missing email, password, or roles (roles must be an array)"}), 400

        # Create user with Firebase Admin SDK
        user = auth.create_user(
            email=email,
            password=password,
        )

        # Store user roles in Firebase Realtime Database
        user_ref = db.reference(f'users/{user.uid}')
        user_ref.set({
            'email': email,
            'roles': roles,
            'createdAt': datetime.datetime.now().isoformat()
        })

        logging.info('User registered successfully with roles.')
        return jsonify({"message": "User registered successfully", "userId": user.uid}), 201
    except Exception as e:
        logging.error(f"Failed to register user: {e}")
        return jsonify({"error": str(e)}), 500

FIREBASE_WEB_API_KEY = os.getenv('FIREBASE_WEB_API_KEY')

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
    
# Start the server
if __name__ == "__main__":
    server.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5001)))


