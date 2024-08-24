from flask import Blueprint
from firebase_admin import db

donor_routes = Blueprint('beneficiary_routes', __name__)

def register_beneficiary(beneficiaryId, beneficiaryName, address, postalCode,
                         contactPerson, email, phone):
  if "" in [beneficiaryId, beneficiaryName, address, postalCode, phone]:
    return False
  
  ref = db.reference("beneficiaries")
  data = {
    "beneficiaryId": beneficiaryId,
    "beneficiaryName": beneficiaryName,
    "email": email,
    "address": address,
    "postCode": postalCode,
    "contactPerson": contactPerson,
    "phone": phone,
  }
  ref.child(beneficiaryId).set(data)
  return True



    

    
  