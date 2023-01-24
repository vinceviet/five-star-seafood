from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Product, Category

product_routes = Blueprint('products', __name__)

@product_routes.route('/<string:category>')
def get_products_by_category(category):
    category_name = Category.query.filter(Category.name == category).all()
    products = Product.query.filter(Product.category_id.in_([category.id for category in category_name])).all()
    
    return {'products' : [product.to_dict() for product in products]}
