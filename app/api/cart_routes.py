from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Product, Category

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/addItem', methods=["POST"])
def add_to_cart():
    pass
