from flask import Blueprint, jsonify
from app.models import Product, Category
from sqlalchemy import or_, and_

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

@product_routes.route('/search/<string:query>')
def search_product(query):
    products = Product.query.filter(Product.name.ilike(f'%{query}%')).all()
    cat_ids = Category.query.filter(or_(Category.name.like(f'%{query}'), Category.sub_category.like(f'%{query}'))).all()
    lst_ids = [id.id for id in cat_ids]
    cat_products = Product.query.filter(Product.category_id.in_(lst_ids)).all()
    search_results = products + cat_products
    if search_results:
        return {'products': [product.to_dict() for product in search_results]}
    return {'message': 'No products match this search'}
