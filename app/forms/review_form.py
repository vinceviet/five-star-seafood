from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review


class ReviewForm(FlaskForm):
    review = TextAreaField('Review', validators=[DataRequired(message='Please leave a review')])
    star_rating = SelectField('Rating', choices=[1,2,3,4,5], validators=[DataRequired(message='Please select a rating')])
