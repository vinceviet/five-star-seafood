from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,BooleanField, SelectField
from wtforms.validators import DataRequired
from app.models import UserAddress


class AddressForm(FlaskForm):
    address = StringField('Address', validators=[DataRequired(message='Please enter a vaild address.')])
    secondaryAddress = StringField('Secondary Address')
    city = StringField('City', validators=[DataRequired(message='Please enter a vaild city.')])
    state = SelectField('State', choices=[('CA','California'), ('NV','Nevada'), ('AZ','Arizona'), ('OR','Oregon')])
    country = SelectField('Country', choices=[('USA','United States')])
    zipCode = StringField('Zip Code', validators=[DataRequired(message='Please enter a vaild zip code.')])
    phone = StringField('Phone', validators=[DataRequired(message='Please enter a vaild phone number.')])
    primary = BooleanField('Primary Address', default=False)
