from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import UserAddress


class AddressForm(FlaskForm):
    address = StringField('Address', validators=[DataRequired(message='Please enter a vaild address.')])
    city = StringField('City', validators=[DataRequired(message='Please enter a vaild city.')])
    state = StringField('State', validators=[DataRequired(message='Please enter a vaild state.')])
    country = StringField('Country', validators=[DataRequired(message='Please enter a vaild country.')])
    zipCode = IntegerField('Zip Code', validators=[DataRequired(message='Please enter a vaild zip code.')])
    phone = IntegerField('Phone', validators=[DataRequired(message='Please enter a vaild phone number.')])
