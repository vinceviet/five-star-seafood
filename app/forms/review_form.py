from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField
from wtforms.validators import DataRequired, NumberRange
from app.models import Review


class ReviewForm(FlaskForm):
    review = TextAreaField('Review', validators=[DataRequired(message='Please leave a review')])
    star_rating = SelectField('Rating', choices=[1,2,3,4,5], validators=[DataRequired(message='Please select a rating'), NumberRange(min=1, max=5, message='Rating must be between 1 and 5')])
