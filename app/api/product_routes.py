from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product, Category

product_routes = Blueprint('prodcuts', __name__)

@product_routes.route('/<string:name>')
def get_products_by_category(name):
    id = Category.query.get(name).id
    products = Product.query.filter(Product.category_id == id)

    return products.to_dict()
