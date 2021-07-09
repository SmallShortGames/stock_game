from flask import Flask, request, Response, jsonify, json
from flask_cors import CORS
from markupsafe import escape
from app.db import Session
from app.models import User, Portfolio, Position, Company, Company_Data
from app.json_encoder import CompanyJsonEncoder
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from mongoengine import connect
from dotenv import load_dotenv, find_dotenv
import os


load_dotenv(find_dotenv())

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Development')
app.json_encoder = CompanyJsonEncoder
db_url = os.environ.get("MONGODB_URI")
connect(host=db_url)
db = Session()


@app.route('/hello')
def hello():
    return {"key": "value"}


# returns user profile
@app.route('/user/<user_id>')
def user_profile(user_id):
    """User profile route for a central location for user stats and position data"""

    try:
        user = User.objects(id=user_id).first()
    except AttributeError:
        print("error")
    else:
        return {
            "data": {
                "id": str(user.id),
                "username": user.username,
                "gross_profit": float(user.gross_profit),
                "total_equity": float(user.total_equity)
            },
            "message": "success"
        }, 200


@app.route('/buy', methods=['POST'])
def buy():
    """Route will look like http://game.com/buy?id=xyz123&company=ticker&quantity=100"""
    user_id = request.args.get('id')
    company = request.args.get('company')
    quantity = request.args.get('quantity')
    return


@app.route('/sell', methods=['PUT'])
def sell():
    """Route will look like http://game.com/sell?id=xyz123&company=ticker&quantity=100"""
    user_id = request.args.get('id')
    company = request.args.get('company')
    quantity = request.args.get('quantity')
    return


@app.route('/viewstock/<ticker>', methods=['GET'])
def viewstock(ticker):
    """Return company data with historical stock data"""

    res = db.execute("""SELECT * FROM company
    JOIN company_data ON company_data.company_id = company.id
    WHERE company.ticker = :ticker""", {'ticker': ticker}
                     )
    # res = db.query(Company, Company_Data).join(
    #     'id').filter_by(ticker=ticker).all()

    return {
        "data": [json.dumps([c for c in r]) for r in res],
        "message": "success"
    }, 200


@app.route('/stocks', methods=['GET'])
def get_all_companies():
    """Returns a json list of all available companies with their ticker and industry"""
    s = select([Company.id, Company.co_name, Company.sector, Company.ticker])
    companies = db.execute(s).fetchall()
    print(companies)
    return {
        "data": [dict(row) for row in companies],
        "message": "Success"
    }, 200


@app.route('/viewdefinition')
def viewdef(term):
    return


@app.route('/login', methods=['POST'])
def login():
    """Login route checks to see if a users email exists then checks to verify password hash matches"""
    email = request.json['email']
    password = request.json['password']

    try:
        exist_user = User.objects.filter(email=email).first()
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
                    "id": str(exist_user.id),
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
    new_user.password = generate_password_hash(password)
    new_user.operating_income = 50000.00
    new_user.gross_profit = 0.00
    new_user.total_equity = 50000.00
    try:
        new_user.save()
        user = User.objects.filter(email=email).first()
        Portfolio(balance=0.00, user_id=user).save()
    except IntegrityError:
        return {"data": None, "message": "Email already exists"}, 401
    else:
        return {
            "data": {
                'id': str(user.id),
                'username': user.username,
                'email': user.email
            },
            "message": "success!"
        }, 201
