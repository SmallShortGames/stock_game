from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from markupsafe import escape
# from app.db import db, Session, Base
from app.models import User, Portfolio, Position, Company
from werkzeug.security import check_password_hash
# from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from mongoengine import connect
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Development')
db_url = os.environ.get("MONGODB_URI")
connect(host=db_url)
# database = Session()

# Base.metadata.create_all(bind=db)


@app.route('/hello')
def hello():
    return {"key": "value"}

# returns user profile


@app.route('/user/<username>')
def user_profile(username):
    email = request.json['email']

    try:
        user = database.query(User).filter_by(email=email).first()
    except AttributeError:
        print("error")
    else:
        return {
            "data": {
                "id": user.id,
                "username": user.username,
                "gross_profit": user.gross_profit,
                "total_equity": user.total_equity
            },
            "message": "success"
        }, 200

    return 'Welcome, %!' % escape(username)


@app.route('/buy')
def buy():
    return


@app.route('/viewstock')
def viewstock():
    return


@app.route('/viewdefinition')
def viewdef(term):
    return


@app.route('/login', methods=['POST'])
def login():
    """Login route checks to see if a users email exists then checks to verify password hash matches"""
    email = request.json['email']
    password = request.json['password']

    try:
        exist_user = User.objects(email=email)
    except AttributeError:
        print("error")
    else:
        if exist_user is None:
            return {"data": None, "message": "User not found"}, 401
        elif not check_password_hash(exist_user.password, password):
            return {"data": None, "message": "Unauthorized"}, 401
        else:
            return {
                "data": {
                    "id": exist_user.id,
                    "username": exist_user.username,
                    "email": exist_user.email
                },
                "message": "success!"
            }, 200


@app.route('/register', methods=['POST'])
def register():
    """User registration route"""
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    new_user = User()
    new_user.username = username
    new_user.email = email
    new_user.password = password
    new_user.operating_income = 50000.00
    new_user.gross_profit = 0.00
    new_user.total_equity = 50000.00
    try:
        new_user.save()
    except IntegrityError:
        return {"data": None, "message": "Email already exists"}, 401
    else:
        return {
            "data": {
                'username': username,
                'email': email
            },
            "message": "success!"
        }, 201
