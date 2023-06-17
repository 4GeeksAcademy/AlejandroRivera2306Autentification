"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Email not found"}), 404

    if email != user.email or password != user.password:
        return jsonify({"msg": "Password incorrect"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)




@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 401

    # Crear un nuevo usuario
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": 'Usuario creado exitosamente'
    }
    return jsonify(response_body), 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # return jsonify(logged_in_as=current_user), 200
    
    response_body = {
        "msg": "Usuario Logeado",
        "user": user.serialize()
    }


    return jsonify(response_body), 200



    