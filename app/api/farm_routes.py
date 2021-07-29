from flask import Blueprint, jsonify
from app.models import Farm

farm_routes = Blueprint('farms', __name__)

@farm_routes.route('/')
def farms():
    farms = Farm.query.all()
    return {'farms': [farm.to_dict() for farm in farms]}

@farm_routes.route('/<int:id>')
def farm(id):
    farm = Farm.query.get(id)
    return farm.to_dict()
