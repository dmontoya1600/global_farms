from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))

    farms = db.relationship('Farm', back_populates="users", secondary='saved_farms')
    userWallets = db.relationship('UserWallet', back_populates="users", uselist=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class UserWallet(db.Model):
    __tablename__ = 'userWallets'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    users = db.relationship('User', back_populates='userWallets')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'buyingPower': self.buyingPower,
        }
