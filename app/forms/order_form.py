from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField


class OrderForm(FlaskForm):
    farmId = IntegerField('farmId')
    userId = IntegerField('userId')
    orderType = StringField('orderType')
    shares = IntegerField('shares')
