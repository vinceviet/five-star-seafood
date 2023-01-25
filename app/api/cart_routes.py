from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Cart, CartItem, Product
from flask_login import current_user

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/addItem/<init:id>', methods=["POST"])
def add_to_cart(id):
    current_cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    add_item = CartItem.query.filter(CartItem.product_id == id).first()
    product = Product.query.get(id)

    if not add_item:
        new_item = CartItem(
            product_quantity=1,
            total_item_price=product.price,
            product_id=id,
            cart_id=current_cart.id
        )
    else:
        add_item.product_quantity += 1
        add_item.total_item_price = add_item.product_quantity * product.price

    return current_cart.to_dict()
