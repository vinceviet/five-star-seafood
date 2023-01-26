from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Product
from ..forms import ReviewForm
from datetime import datetime

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('/product/<int:id>')
def get_reviews(id):
    reviews = Review.query.filter(Review.product_id == id)
    return {'reviews': [reviews.to_dict() for reviews in reviews]}, 200


@reviews_routes.route('/product/<int:id>/reviews', methods=['POST'])
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
    reviews = Review.query.filter(Review.product_id == id).all()
    review_ratings = [reviews.stars.to_dict() for reviews in reviews]
    total_ratings = sum(review_ratings)
    product.num_reviews += 1
    product.avg_star_rating = total_ratings / product.num_reviews
    db.session.commit()
    return product.to_dict(), 201

@reviews_routes.route('/product/<int:id>/reviews', methods=['PUT'])
@login_required
def update_review(id):
    product = Product.query.get(id)
    if not product:
        return {'errors': ['product does not exist']}, 404


    review = Review.query.filter(Review.product_id == id and Review.user_id == current_user.id).all()
    if not review:
        return {'error' : ['invalid request']}

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data['review'],
        review.stars = form.data['stars'],
        review.date_time = datetime.now().strftime("%m/%d/%Y %H:%M")

    db.session.add(review)
    reviews = Review.query.filter(Review.product_id == id).all()
    review_ratings = [reviews.stars.to_dict() for reviews in reviews]
    total_ratings = sum(review_ratings)
    product.num_reviews += 1
    product.avg_star_rating = total_ratings / product.num_reviews
    db.session.commit()
    return product.to_dict(), 201

@reviews_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    product = Product.query.get(review.product_id)
    db.session.delete(review)
    reviews = Review.query.filter(Review.product_id == id).all()
    review_ratings = [reviews.stars.to_dict() for reviews in reviews]
    total_ratings = sum(review_ratings)
    product.num_reviews -= 1
    product.avg_star_rating = total_ratings / product.num_reviews
    db.session.commit()
    return review.to_dict()
