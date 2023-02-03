from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, UserAddress
from app.forms import AddressForm
from sqlalchemy import and_

user_routes = Blueprint('users', __name__)


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/address')
@login_required
def user_addresses(id):
    user = User.query.get(id)
    return {'addresses': [user.to_dict() for user in user]}

@user_routes.route('/<int:id>/address', methods=['POST'])
@login_required
def add_address(id):
    user = User.query.get(id)
    if not user:
        return {'errors': ['user does not exist']}, 404

    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_address = UserAddress(
            user_id=user.id,
            phone=form.data['phone'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            zip_code=form.data['zipCode'],
            primary=form.data['primary'],
        )

        if new_address.primary==True:
            current_primary = UserAddress.query.filter(and_(UserAddress.user_id == user.id, UserAddress.primary == True)).first()
            if current_primary:
                current_primary.primary = False
                db.session.add(current_primary)
                db.session.commit()

        db.session.add(new_address)
        db.session.commit()
        return new_address.to_dict()
    return {'errors': [form.errors]}

@user_routes.route('/address/<int:id>', methods=['PUT'])
@login_required
def update_address(id):
    address = UserAddress.query.get(id)
    if not address:
        return {'errors': ['address does not exist']}, 404

    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        address.phone=form.data['phone'],
        address.address=form.data['address'],
        address.city=form.data['city'],
        address.state=form.data['state'],
        address.country=form.data['country'],
        address.zip_code=form.data['zipCode'],
        address.primary=form.data['primary'],

        db.session.add(address)
        db.session.commit()
        return address.to_dict()

    return {'errors': [form.errors]}

@user_routes.route('/address/<int:id>', methods=['DELETE'])
@login_required
def delete_address(id):
    address = UserAddress.query.get(id)
    if not address:
        return {'errors': ['address does not exist']}, 404

    db.session.delete(address)
    db.session.commit()
    return address.to_dict()
