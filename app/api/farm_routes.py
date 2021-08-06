from app.models.farm import Transaction
import math
from flask import Blueprint, jsonify, request, session, current_app
from app.models import db, Farm, User, FarmWallet, Transaction
from app.forms import FarmForm
import logging
import boto3
from botocore.exceptions import ClientError
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

farm_routes = Blueprint('farms', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

def getAvailableShares(totalShares, percentage):
    return totalShares * percentage

@farm_routes.route('/')
def farms():
    farms = Farm.query.all()
    return {'farms': [farm.to_dict() for farm in farms]}

@farm_routes.route('/<int:id>')
def farm(id):
    farm = Farm.query.get(id)
    return farm.to_dict()

@farm_routes.route('/', methods=['POST'])
def createFarm():
    form = FarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        farm = Farm(
            name = form.data['name'],
            userId = form.data['userId'],
            location = form.data['location'],
            about = form.data['about'],
            averageYield = form.data['averageYield'],
        )


        db.session.add(farm)
        db.session.commit()

        currentFarm = Farm.query.filter(Farm.name == form.data['name'], Farm.userId == form.data['userId']).first()
        farmId = currentFarm.id

        market_share = math.floor(getAvailableShares(form.data['dilution'], form.data['stake']))

        farmOwnerShares = form.data['dilution'] - market_share

        print('TESTING THE VALUES', form.data['dilution'], market_share, farmOwnerShares, form.data['price'])

        farmOwner = User.query.get(form.data['userId'])

        transaction = Transaction(usdAmount= (form.data['price'] * math.floor(farmOwnerShares)), shares=math.floor(farmOwnerShares))
        transaction.farms = currentFarm
        transaction.users = farmOwner



        wallet = FarmWallet(
            farmId = farmId,
            buyingPower = 0.0,
            shares = market_share
        )

        print('THIS IS THE WALLET', wallet.to_dict())
        db.session.add(transaction)
        db.session.add(wallet)
        db.session.commit()

        return farm.to_dict()

    return 401


@farm_routes.route('/<int:id>', methods=['DELETE'])
def deleteFarm(id):
    farm = Farm.query.get(id)
    form = FarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newFarm = farm.to_dict()
        print('THIS IS THE NEW FARM', newFarm)
        if newFarm['userId'] == form.data['userId']:
            db.session.delete(farm)
            db.session.commit()
            return {'message': 'deleted succesfully'}
        return {'message': 'user not authorized'}
    return {'message': 'validation failed'}


@farm_routes.route('/<int:id>/save')
def getSavedFarms(id):
    form = FarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():

        db_uri = current_app.config['SQLALCHEMY_DATABASE_URI']
        engine = create_engine(db_uri)
        metadata = MetaData(engine)
        metadata.reflect()
        table = metadata.tables['saved_farms']
        Session = sessionmaker(bind=engine)
        session = Session()
        allSaved = session.query(table).filter_by(userId = id).all()
        allSavedFarms = []
        for saved in allSaved:
            currentFarm = Farm.query.get(saved.farmId)
            allSavedFarms.append(currentFarm.to_dict())

        return jsonify({'saved_farms': allSavedFarms})
    return {'message': 'request did not validate'}

@farm_routes.route('/<int:id>/save', methods=['DELETE'])
def deleteSave(id):
    form = FarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        userId = form.data['userId']
        farm = Farm.query.get(id)
        user = User.query.get(userId)
        user.farms.remove(farm)
        db.session.commit()
        return {'message': 'removed from list succesfully'}

    return {'message': 'request did not validate'}


@farm_routes.route('/<int:id>/save', methods=['POST'])
def saveFarm(id):
    farm = Farm.query.get(id)
    form = FarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        userId = form.data['userId']
        user = User.query.get(userId)
        user.farms.append(farm)
        db.session.commit()
        return farm.to_dict()
    return {'message': 'order did not validate'}


@farm_routes.route('/<int:id>', methods=['PUT'])
def updateFarm(id):
    s3 = boto3.client('s3')
    farm = Farm.query.get(id)
    form = FarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        farm.name = form.data['name'] if form.data['name'] != 'null' else farm.name
        farm.location = form.data['location'] if form.data['location'] != 'null' else farm.location
        farm.about = form.data['about'] if form.data['about'] != 'null' else farm.about
        farm.averageYield = form.data['averageYield'] if form.data['averageYield'] != 'null' else farm.averageYield

        db.session.commit()
        return farm.to_dict()
    if request.files:
        file_data = request.files['image']
        s3.upload_fileobj(file_data, 'global-farms-bucket', file_data.filename,
        ExtraArgs={
            'ACL': 'public-read',
            'ContentType': file_data.content_type
        })
        response = s3.create_presigned_post('global-farms-bucket', file_data.filename)
        image_url = response["url"] + response["fields"]["key"]
        farm.image_url = image_url
        db.session.commit()

    db.session.commit()
    return farm.to_dict()
