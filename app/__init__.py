from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello():
    return {'key':"value"}

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

