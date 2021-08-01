from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField


class FarmForm(FlaskForm):
    name = StringField('name')
    location = StringField('location')
    userId = IntegerField('userId')
    about = TextAreaField('about')
    averageYield = FloatField('averageYield')
