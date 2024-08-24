from flask import Blueprint
from firebase_admin import db

donor_routes = Blueprint('donor_routes', __name__)

def register_donor(donorId, donorName, email,
                   location, phone, organisationName):
  if "" in [donorName, location, phone]:
    return False
  
  ref = db.reference("donors")
  data = {
    "donorId": donorId,
    "donorName": donorName,
    "email": email,
    "location": location,
    "phone": phone,
    "organisationName": organisationName
  }
  ref.child(donorId).set(data)
  return True



    

    
  