from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from markupsafe import escape
from app.db import db, Session, Base
from app.models import User, Portfolio, Position, Company
from werkzeug.security import check_password_hash
from sqlalchemy import select

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Development')

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
    email = request.json['email']
    password = request.json['password']

    exist_user = database.query(User).filter_by(email=email).first()

    if exist_user is None:
        return {}, 401
    elif not check_password_hash(exist_user.password, password):
        return {}, 401
    else:
        return {
            "id": exist_user.id,
            "username": exist_user.username,
            "email": exist_user.email
        }

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

    database.add(new_user)
    database.commit()

    return {'username': username, 'email': email}, 201

