from flask import Blueprint, session
from flask_login import login_required, current_user
from app.models import db, Cart, Product, CartItem, User


cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/addItem/<int:id>', methods=['POST'])
def add_to_cart(id):
    if current_user.is_authenticated():
        current_cart = Cart(user_id=None)
    else:
        current_cart = Cart(user_id=current_user.id)
    # if session.new:
    #     user = User()
    #     session['anonymous_user_id'] = user.id
    # else:
    #     user = User.query.get(session['anonymous_user_id'])
    # print('usssssssssssssssssssser', user)
    # current_cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    # new_cart = Cart(user_id = None)
    # db.session.add(new_cart)
    # db.session.add(current_cart)
    # db.session.commit()


    product = Product.query.get(id)
    print('product', product)
    add_item = CartItem.query.filter(CartItem.product_id == id).first()
    print('addItem', add_item)
    if not add_item:
        add_item = CartItem(
            # user_id = current_cart.user_id,
            product_id=id,
            product_quantity=1,
            total_item_price=product.price,
            cart_id=current_cart.id
        )
        print('additem', add_item)
        db.session.add(add_item)
        db.session.commit()
        print('current cart after db commit',add_item)
        return add_item.to_dict()
    else:
        add_item.product_quantity += 1
        add_item.total_item_price += product.price
        db.session.add(add_item)
        db.session.commit()
        print('current cart after db commit', add_item)
        return add_item.to_dict()
