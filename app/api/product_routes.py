from flask import Blueprint, jsonify, request
from app.models import Product, Category

product_routes = Blueprint('products', __name__)

@product_routes.route('/pages/<string:category>')
def get_products_by_category(category):
    category_name = Category.query.filter(Category.name == category).first()
    products = Product.query.filter(Product.category_id == category_name.id).all()

    return {'products' : [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def get_product_details(id):
    product = Product.query.get(id)
    return product.to_dict()

@product_routes.route('/search')
def search_product():
    query = request.args.get('q')
    products = Product.query.filter(Product.like(query)).all()
    if products:
        return {'products': [product.to_dict() for product in products]}
    return {'message': 'No products match this search'}
