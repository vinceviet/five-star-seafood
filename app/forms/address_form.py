from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,BooleanField, SelectField
from wtforms.validators import DataRequired
from app.models import UserAddress


class AddressForm(FlaskForm):
    address = StringField('Address', validators=[DataRequired(message='Please enter a vaild address.')])
    city = StringField('City', validators=[DataRequired(message='Please enter a vaild city.')])
    state = SelectField('State', choices=['California', 'Nevada', 'Arizona', 'Oregon'])
    country = SelectField('Country', choices=['United States'])
    zipCode = IntegerField('Zip Code', validators=[DataRequired(message='Please enter a vaild zip code.')])
    phone = IntegerField('Phone', validators=[DataRequired(message='Please enter a vaild phone number.')])
    primary = BooleanField('Primary Address')
