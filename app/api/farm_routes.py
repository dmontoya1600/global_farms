from flask import Blueprint, jsonify, request, session
from app.models import db, Farm
from app.forms import FarmForm
import logging
import boto3
from botocore.exceptions import ClientError

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
        return farm.to_dict()

    return 401


@farm_routes.route('/<int:id>', methods=['PUT'])
def updateFarm(id):
    s3 = boto3.client('s3')
    farm = Farm.query.get(id)
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

    content = request.json
    name = content['name']
    location = content['location']
    averageYield = content['averageYield']

    farm.name = name or farm.name
    farm.location = location or farm.location
    farm.averageYield = averageYield or farm.averageYield

    db.session.commit()
    return farm.to_dict()
