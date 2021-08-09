from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    print('THIS IS THE FORM', form.data['userId'])
    if(user):
        if (form.data['userId'] != user.id):
            raise ValidationError('Username is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    print('THIS IS THE FORM', form.data)
    if(user):
        print('USERID:', form.data['userId'], user.id)
        if form.data['userId'] != user.id:
            raise ValidationError('Username is already in use.')




class UserForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    userId = IntegerField('userId')
