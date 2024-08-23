<<<<<<< HEAD
import os
import logging
from flask import Flask, request, jsonify

=======
import logging
from flask import Flask, request, jsonify
import os
>>>>>>> bd78909a730297a3d5a22b04d4613a5a04b60838
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import base64
from dotenv import load_dotenv  

# Initialize Flask server
server = Flask(__name__)

# Load the .env file
load_dotenv()

# Fetch the service account key JSON file contents
cred = credentials.Certificate('settings.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': os.getenv("DATABASE_URL")
})

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


# Start the server
if __name__ == "__main__":
<<<<<<< HEAD
    server.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5000)))
=======
    server.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5000)))
>>>>>>> bd78909a730297a3d5a22b04d4613a5a04b60838
