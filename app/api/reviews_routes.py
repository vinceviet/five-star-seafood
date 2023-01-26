from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Product
from ..forms import ReviewForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages


reviews_routes = Blueprint('reviews', __name__)


@reviews_routes.route('/product/<int:id>/reviews')
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
            user_id=current_user.id,
            product_id=id,
            review=form.data['review'],
            stars=form.data['stars'],
            date_time=datetime.now().strftime("%m/%d/%Y")
        )
        db.session.add(new_review)
        reviews = Review.query.filter(Review.product_id == id).all()
        review_ratings = [int(reviews.stars) for reviews in reviews]
        total_ratings = sum(review_ratings)
        product.num_reviews += 1
        product.avg_star_rating = total_ratings / product.num_reviews
        db.session.commit()
        return new_review.to_dict(), 201

    # return new_review.to_dict(), 201
    return {'errors': [form.errors]}
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@reviews_routes.route('/product/<int:id>/reviews', methods=['PUT'])
@login_required
def update_review(id):
    product = Product.query.get(id)
    if not product:
        return {'errors': ['product does not exist']}, 404

    review = Review.query.filter(and_(
        Review.product_id == id, Review.user_id == current_user.id)).all()
    if not review:
        return {'error': ['invalid request']}

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('--------------------form data UPDATE', form.data)
        current_review = Review.query.get([review.id for review in review])
        current_review.user_id = current_user.id
        current_review.product_id = product.id
        current_review.review = form.data['review']
        current_review.stars = form.data['stars']
        current_review.date_time = datetime.now().strftime("%m/%d/%Y")

        print('--------------------form data UPDATE', current_review)
        db.session.add(current_review)
        reviews = Review.query.filter(Review.product_id == id).all()
        review_ratings = [int(reviews.stars) for reviews in reviews]
        total_ratings = sum(review_ratings)
        product.num_reviews += 1
        product.avg_star_rating = total_ratings / product.num_reviews
        db.session.commit()
        return current_review.to_dict(), 201
    return {'errors': [form.errors]}


@reviews_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    product = Product.query.get(review.product_id)
    db.session.delete(review)
    reviews = Review.query.filter(Review.product_id == id).all()
    review_ratings = [reviews.stars for reviews in reviews]
    total_ratings = sum(review_ratings)
    product.num_reviews -= 1
    product.avg_star_rating = total_ratings / product.num_reviews
    db.session.commit()
    return review.to_dict()
