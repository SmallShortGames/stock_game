from flask import Flask
from flask_cors import CORS
from markupsafe import escape
from config import Development
from app.db import db, Session
from app.models import User, Portfolio, Position, Company

app = Flask(__name__)
CORS(app)
app.config.from_object(Development)

database = Session()

User.metadata.create_all(bind=db)

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

@app.route('/login')
def login(username, password):
    return

