from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Product, Category

product_routes = Blueprint('products', __name__)

@product_routes.route('/pages/<string:category>')
def get_products_by_category(category):
    category_name = Category.query.filter(Category.name == category).all()
    products = Product.query.filter(Product.category_id.in_([category.id for category in category_name])).all()

    return {'products' : [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def get_product_details(id):
    product = Product.query.get(id)
    return product.to_dict()
