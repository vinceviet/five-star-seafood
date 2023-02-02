from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def length_check(form, field):
    if len(field.data) > 30:
        raise ValidationError('Name must be less than 30 characters')

def password_check(form, field):
    if len(field.data) < 4:
        raise ValidationError('Password must be 4 or more characters')


class SignUpForm(FlaskForm):
    firstName = StringField(
        'First Name', validators=[DataRequired(message='Please provide a first name.'), length_check])
    lastName = StringField(
        'Last Name', validators=[DataRequired(message='Please provide a last name'), length_check])
    email = StringField('email', validators=[DataRequired(message='Please provide a valid email.'), user_exists, Email(message='Please provide a valid email.')])
    password = StringField('password', validators=[DataRequired(message='Password must be at least 4 characters.'), password_check])
