from app.forms import UserForm
from app.models.user import UserWallet
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, UserWallet, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['POST'])
def updateUser(id):
    user = User.query.get(id)
    print('ROUTE IS HIT')
    form = UserForm()
    print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        if(form.data['username']):
            user.username = form.data['username']
        if(form.data['email']):
            user.email = form.data['email']

        db.session.commit()
        user = User.query.get(id)
        return user.to_dict()
    else: return {'message': 'invalid form'}


@user_routes.route('/<int:id>/wallet')
@login_required
def userWallet(id):
    wallet = UserWallet.query.filter(UserWallet.userId == id).first()
    return wallet.to_dict()
