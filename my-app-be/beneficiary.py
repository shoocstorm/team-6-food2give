from flask import Blueprint
from firebase_admin import db

donor_routes = Blueprint('beneficiary_routes', __name__)

def register_beneficiary(beneficiaryId, beneficiaryName, location,
                         email, phone):
  if "" in [beneficiaryId, beneficiaryName, location, phone]:
    return False
  
  ref = db.reference("beneficiaries")
  data = {
    "beneficiaryId": beneficiaryId,
    "beneficiaryName": beneficiaryName,
    "email": email,
    "location": location,
    "phone": phone,
  }
  ref.child(beneficiaryId).set(data)
  return True



    

    
  