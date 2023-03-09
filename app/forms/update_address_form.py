from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, Length


class UpdateAddressForm(FlaskForm):
    address = StringField('Address', validators=[DataRequired(message='Please enter a vaild address.')])
    secondaryAddress = StringField('Secondary Address')
    city = StringField('City', validators=[DataRequired(message='Please enter a vaild city.')])
    state = SelectField('State', choices=[('CA','California')])
    country = SelectField('Country', choices=[('USA','United States')])
    zipCode = StringField('Zip Code', validators=[DataRequired(message='Please enter a vaild zip code.'), Length(min=5, max=5, message='Please enter a 5 digit zip code.')])
    phone = StringField('Phone', validators=[DataRequired(message='Please enter a vaild phone number.'), Length(min=10, max=10, message='Please enter a 10 digit phone number without hyphens.')])
    primary = BooleanField('Primary Address', default=False)
