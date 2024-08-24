from flask import Blueprint
from firebase_admin import db

donor_routes = Blueprint('donor_routes', __name__)

def register_donor(donorId, donorName, email,
                   address, postalCode, phone, organisationName):
  if "" in [donorName, address, postalCode, phone]:
    return False
  
  ref = db.reference("donors")
  data = {
    "donorId": donorId,
    "donorName": donorName,
    "email": email,
    "address": address,
    "postCode": postalCode,
    "phone": phone,
    "organisationName": organisationName
  }
  ref.child(donorId).set(data)
  return True



    

    
  