from .db import db

transactions = db.Table(
    'transactions',
    db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("farmId", db.Integer, db.ForeignKey(
        "farms.id"), primary_key=True),
    db.Column("usdAmount", db.Float, nullable=False),
    db.Column("shares", db.Integer, nullable=False)
)

class Farm(db.Model):
    __tablename__ = 'farms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    location = db.Column(db.String(255), unique=True)
    averageYield = db.Column(db.Float)
    averageSharePrice = db.Column(db.Float)
    averageRating = db.Column(db.Numeric(2,1))
    image_url = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship("User", back_populates="farms")
    farmWallets = db.relationship('FarmWallet', back_populates='farms', uselist=False)

class FarmWallet(db.Model):
    __tablename__ = 'farmWallets'

    id = db.Column(db.Integer, primary_key=True)
    farmId = db.Column(db.Integer, db.ForeignKey('farms.id'))
    farms = db.relationship('Farm', back_populates='farmWallets')
