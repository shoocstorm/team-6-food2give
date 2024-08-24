from flask import Blueprint
from firebase_admin import db

ROUTE_PREFIX = "delivery_volunteer"
delivery_volunteer_routes = Blueprint('delivery_volunteer_routes', __name__)

def register_delivery_volunteer(deliveryVolunteerId, deliveryVolunteerName,
                                email, phone, location, availableFrom, availableTo):
  if "" in [deliveryVolunteerId, deliveryVolunteerName, phone, location]:
    return False
  
  ref = db.reference("delivery-volunteers")
  data = {
    "deliveryVolunteerId": deliveryVolunteerId,
    "deliveryVolunteerName": deliveryVolunteerName,
    "email": email,
    "phone": phone,
    "location": location,
    "availableFrom": availableFrom,
    "availableTo": availableTo,

  }
  ref.child(deliveryVolunteerId).set(data)
  return True



    

    
  