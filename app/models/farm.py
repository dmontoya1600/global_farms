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

saved_farms = db.Table(
    'saved_farms',
    db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("farmId", db.Integer, db.ForeignKey(
        "farms.id"), primary_key=True),
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
    about = db.Column(db.Text)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship("User", secondary=saved_farms, back_populates="farms")
    farmWallets = db.relationship('FarmWallet', back_populates='farms', uselist=False)
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'averageYield': self.averageYield,
            'averageSharePrice': self.averageSharePrice,
            'averageRating': self.averageRating,
            'image_url': self.image_url,
            'userId': self.userId,
            'about': self.about,
        }

class FarmWallet(db.Model):
    __tablename__ = 'farmWallets'

    id = db.Column(db.Integer, primary_key=True)
    farmId = db.Column(db.Integer, db.ForeignKey('farms.id'))
    shares = db.Column(db.Integer)
    buyingPower = db.Column(db.Float)

    farms = db.relationship('Farm', back_populates='farmWallets')

    def to_dict(self):
        return {
            'id': self.id,
            'farmId': self.farmId,
            'shares': self.shares,
        }
