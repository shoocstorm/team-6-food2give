from flask import Blueprint
from firebase_admin import db

ROUTE_PREFIX = "storage_volunteer"
storage_volunteer_routes = Blueprint('storage_volunteer_routes', __name__)

def register_storage_volunteer(storageVolunteerId, storageVolunteerName,
                               email, phone, location, availability, storageCapacity):
  if "" in [storageVolunteerId, storageVolunteerName, phone, location, storageCapacity]:
    return False
  
  ref = db.reference("storage-volunteers")
  data = {
    "storageVolunteerId": storageVolunteerId,
    "storageVolunteerName": storageVolunteerName,
    "email": email,
    "phone": phone,
    "location": location,
    "availability": availability,
    "storageCapacity": storageCapacity,
  }
  ref.child(storageVolunteerId).set(data)
  return True



    

    
  