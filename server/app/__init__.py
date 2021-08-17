from flask import Flask, request, Response, jsonify, json
from flask_cors import CORS
from markupsafe import escape
from app.json_encoder import CompanyJsonEncoder
from dotenv import load_dotenv, find_dotenv
from mongoengine import connect
import os


load_dotenv(find_dotenv())

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Development')
app.json_encoder = CompanyJsonEncoder
db_url = os.environ.get("MONGODB_URI")
connect(host=db_url)

# def create_app(test_config=None):
#     app = Flask(__name__, instance_relative_config=True)
#     app.config.from_object('config.Development')
#     app.json_encoder = CompanyJsonEncoder

#     try:
#         os.makedirs(app.instance_path)
#     except OSError:
#         pass

#     @app.route('/hello')
#     def hello():
#         return "Hello World"

#     from .routes import auth
#     app.register_blueprint(auth.bp)

#     from .routes import user
#     app.register_blueprint(user.bp)

#     from .routes.api import stocks
#     app.register_blueprint(stocks.bp)

#     return app


@app.route('/hello')
def hello():
    return {'key': 'value'}


from .routes import user
app.register_blueprint(user.bp)

from .routes import api
app.register_blueprint(api.bp)


@app.route('/viewdefinition')
def viewdef(term):
    return
