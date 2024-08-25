from flask import Blueprint
from firebase_admin import db

ROUTE_PREFIX = "delivery_volunteer"
delivery_volunteer_routes = Blueprint('delivery_volunteer_routes', __name__)

def register_delivery_volunteer(deliveryVolunteerId, deliveryVolunteerName,
                                email, address, postalCode, availableFrom, availableTo):
  if "" in [deliveryVolunteerId, deliveryVolunteerName, address, postalCode]:
    return False
  
  ref = db.reference("delivery-volunteers")
  data = {
    "deliveryVolunteerId": deliveryVolunteerId,
    "deliveryVolunteerName": deliveryVolunteerName,
    "email": email,
    "address": address,
    "postalCode": postalCode,
    "availableFrom": availableFrom,
    "availableTo": availableTo,
  }
  ref.child(deliveryVolunteerId).set(data)
  return True



    

    
  