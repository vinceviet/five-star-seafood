from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

reviews_routes = Blueprint('reviews', __name__)
