from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from markupsafe import escape
from app.db import db, Session, Base
from app.models import User, Portfolio, Position, Company
from werkzeug.security import check_password_hash
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from mongoengine import connect
import os

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Development')
db_url = os.getenv("MONGODB_URI")
connect(host=db_url)
database = Session()

Base.metadata.create_all(bind=db)

@app.route('/hello')
def hello():
    return {"key": "value"}

# returns user profile
@app.route('/user/<username>')
def user_profile(username):
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
        exist_user = database.query(User).filter_by(email=email).first()
    except AttributeError:
        print("error")
    else:
        if exist_user is None:
            return {"message": "User not found"}, 401
        elif not check_password_hash(exist_user.password, password):
            return {"message": "Unauthorized"}, 401
        else:
            return {
                "id": exist_user.id,
                "username": exist_user.username,
                "email": exist_user.email
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
    try:
        database.add(new_user)
        database.commit()
    except IntegrityError:
        return {"message": "Email already exists"}, 401
    else:
        return {'username': username, 'email': email}, 201

