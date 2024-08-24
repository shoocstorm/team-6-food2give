from flask import Blueprint
from firebase_admin import db

ROUTE_PREFIX = "storage_volunteer"
storage_volunteer_routes = Blueprint('storage_volunteer_routes', __name__)

def register_storage_volunteer(storageVolunteerId, storageVolunteerName,
                               email, phone, address, postalCode, availableFrom,
                               availableTo, storageCapacity):
  if "" in [storageVolunteerId, storageVolunteerName, phone, address, postalCode, storageCapacity]:
    return False
  
  ref = db.reference("storage-volunteers")
  data = {
    "storageVolunteerId": storageVolunteerId,
    "storageVolunteerName": storageVolunteerName,
    "email": email,
    "phone": phone,
    "address": address,
    "postalCode": postalCode,
    "availableFrom": availableFrom,
    "availableTo": availableTo,
    "storageCapacity": storageCapacity,
  }
  ref.child(storageVolunteerId).set(data)
  return True



    

    
  