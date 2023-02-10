from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Order


orders_routes = Blueprint('orders', __name__)

@orders_routes.route('')
def load_orders():
    orders = Order.query.all()
    return {'orders': [order.to_dict() for order in orders]}

@orders_routes.route('/<string:orderNum>')
def order_details(orderNum):
    orders = Order.query.filter(Order.order_number == orderNum).all()
    return {'orders': order.to_dict() for order in orders}

@orders_routes.route('/<string:orderNum>', methods=['DELETE'])
def order_details(orderNum):
    orders = Order.query.filter(Order.order_number == orderNum).all()
    [db.session.delete(order) for order in orders]
    db.session.commit()
    return orders.to_dict()
