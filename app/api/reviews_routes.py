from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Product
from ..forms import ReviewForm
from datetime import datetime

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.routes('/product/<int:id>')
def get_reviews(id):
    reviews = Review.query.filter(Review.product_id == id)
    return {'reviews': [reviews.to_dict() for reviews in reviews]}, 200


@reviews_routes.routes('/product/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    product = Product.query.get(id)
    if not product:
        return {'errors': ['product does not exist']}, 404

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            product_id = id,
            review = form.data['review'],
            stars = form.data['stars'],
            date_time = datetime.now().strftime("%m/%d/%Y %H:%M")
        )

    db.session.add(new_review)
    db.session.commit()
    return product.to_dict(), 201
