from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField, FileField


class FarmForm(FlaskForm):
    name = StringField('name')
    location = StringField('location')
    userId = IntegerField('userId')
    about = TextAreaField('about')
    averageYield = FloatField('averageYield')
    stake = FloatField('stake')
    dilution = IntegerField('dilution')
    price = FloatField('price')
    image = FileField('image')
