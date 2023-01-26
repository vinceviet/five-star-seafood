from flask import Blueprint, session
from flask_login import login_required, current_user
from app.models import db, Cart, Product, CartItem, User
from sqlalchemy import and_


cart_routes = Blueprint('cart', __name__)


@cart_routes.route('')
def load_cart():
    cart_items = CartItem.query.all()
    return {'cartItems': [cart_items.to_dict() for cart_items in cart_items]}, 200


@cart_routes.route('/addItem/<int:id>', methods=['POST'])
def add_to_cart(id):
    if current_user.is_authenticated:
        current_cart = Cart.query.filter(
            Cart.user_id == current_user.id).first()
        if not current_cart:
            current_cart = Cart(user_id=current_user.id)
            db.session.add(current_cart)
            db.session.commit()
    else:
        current_cart = Cart.query.filter(Cart.user_id == 0).first()
        if not current_cart:
            current_cart = Cart(user_id=0)
            db.session.add(current_cart)
            db.session.commit()

    product = Product.query.get(id)
    add_item = CartItem.query.filter(CartItem.product_id == product.id).first()

    if not add_item:
        add_item = CartItem(
            product_id=product.id,
            product_quantity=1,
            name=product.name,
            price=product.price,
            description=product.description,
            total_item_price=product.price,
            cart_id=current_cart.id
        )
        current_cart.total_price += product.price
        db.session.add(add_item)
        db.session.commit()
        return add_item.to_dict()
    else:
        add_item.product_quantity += 1
        add_item.total_item_price += product.price
        current_cart.total_price += product.price
        db.session.add(add_item)
        db.session.commit()
        return add_item.to_dict()

@cart_routes.route('/add/<int:id>', methods=['POST'])
def add_one_in_cart(id):
    cartItem = CartItem.query.get(id)
    cartItem.product_quantity += 1
    cartItem.total_item_price += cartItem.price
    cart = Cart.query.get(cartItem.cart_id)
    cart.total_price += cartItem.price
    db.session.commit()
    return cartItem.to_dict()


@cart_routes.route('/minus/<int:id>', methods=['POST'])
def minus_one_in_cart(id):
    cartItem = CartItem.query.get(id)
    cartItem.product_quantity -= 1
    cartItem.total_item_price -= cartItem.price
    cart = Cart.query.get(cartItem.cart_id)
    cart.total_price -= cartItem.price
    if cartItem.product_quantity == 0:
        db.session.delete(cartItem)
        db.session.commit()
    db.session.commit()
    return cartItem.to_dict()

@cart_routes.route('/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
    cartItem = CartItem.query.get(id)
    removed_price = cartItem.total_item_price * cartItem.product_quantity
    db.session.delete(cartItem)
    cart = Cart.query.get(cartItem.cart_id)
    cart.total_price -= removed_price
    db.session.commit()
    return cartItem.to_dict()
