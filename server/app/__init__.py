from flask import Flask, request, Response, jsonify, json
from flask_cors import CORS
from markupsafe import escape
from app.db import Session
from app.models import User, Portfolio, Position, Company, Company_Data, Transaction
from app.json_encoder import CompanyJsonEncoder
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from mongoengine import connect
from dotenv import load_dotenv, find_dotenv
from datetime import datetime
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
    return {'key': 'value'}


# returns user profile
@app.route('/user/<user_id>')
def user_profile(user_id):
    """User profile route for a central location for user stats and position data"""

    try:
        user = User.objects(id=user_id).first()
        portfolio = Portfolio.objects(user_id=user.id).first()
    except AttributeError:
        print('error')
    else:
        return {
            'data': {
                'id': str(user.id),
                'username': user.username,
                'gross_profit': user.gross_profit,
                'total_equity': user.total_equity,
                'portfolio': json.loads(portfolio.to_json())
            },
            'message': 'success'
        }, 200


@app.route('/buy', methods=['PUT'])
def buy():
    """Buy route will embed a transaction document within the portfolio class along with either embedding a new position document or updating an existing position"""
    user_id = request.json['id']  # user id
    company = request.json['company']  # company ticker
    cost = request.json['cost']  # total cost
    quantity = request.json['quantity']  # desired int

    # query is a work in progress
    updated_date = datetime.utcnow
    res = db.query(Company).filter_by(ticker=company).first()
    t = Transaction(price=cost, quantity=quantity, company=res.co_name)
    p = Position(current_cost=cost/quantity, avg_cost=cost/quantity, quantity=quantity,
                 current_return=0, total_return=0, company_id=res.id,
                 company_ticker=res.ticker, company_name=res.co_name)
    existing_port = Portfolio.objects.filter(user_id=user_id).first()

    if len(existing_port.positions) == 0:
        updated = existing_port.update(add_to_set__positions=p)
    else:
        for pos in existing_port.positions:
            if pos.company_name == p.company_name:
                pos.avg_cost = (float(pos.current_cost) + cost/quantity)/2
                pos.current_cost = cost/quantity
                pos.quantity += quantity
                pos.updated_at = updated_date
                break
        existing_port.save()

    update_p = Portfolio.objects.filter(user_id=user_id).update(
        add_to_set__transactions=t, dec__balance=cost, updated_at=updated_date)
    update_u = User.objects.filter(
        id=user_id).update(dec__operating_income=cost, updated_at=updated_date)
    user = User.objects.filter(id=user_id).first()
    portfolio = Portfolio.objects.filter(user_id=user.id).first()

    return {
        'data': {
            'id': str(user.id),
            'username': user.username,
            'gross_profit': user.gross_profit,
            'total_equity': user.total_equity,
            'portfolio': json.loads(portfolio.to_json())
        },
        'message': 'Success'
    }, 200


@app.route('/sell', methods=['PUT'])
def sell():
    """Sell route will subtract the quantity of the given stock and embed a new transaction document within the portfolio"""
    user_id = request.json['id']  # user id
    company = request.json['company']  # company ticker
    cost = request.json['cost']  # total cost
    quantity = request.json['quantity']  # desired int

    # query is a work in progress
    updated_date = datetime.utcnow
    res = db.query(Company).filter_by(ticker=company).first()
    t = Transaction(buy_side=False, price=cost,
                    quantity=quantity, company=res.co_name)
    p = Position(current_cost=cost/quantity, avg_cost=cost/quantity, quantity=quantity,
                 current_return=0, total_return=0, company_id=res.id,
                 company_ticker=res.ticker, company_name=res.co_name)
    existing_port = Portfolio.objects.filter(user_id=user_id).first()

    if len(existing_port.positions) == 0:
        return {'data': {}, 'message': 'Failure to find current amount. This is likely an error in the server'}, 400
    else:
        for pos in existing_port.positions:
            if pos.company_name == p.company_name:
                pos.avg_cost = (float(pos.current_cost) + cost/quantity)/2
                pos.current_cost = cost/quantity
                if pos.quantity - quantity < 0:
                    return {'data': {}, 'message': 'Insufficient quantity held please try again'}, 400
                pos.quantity -= quantity
                pos.updated_at = updated_date
                break
        existing_port.save()

    update_p = Portfolio.objects.filter(user_id=user_id).update(
        add_to_set__transactions=t, inc__balance=cost, updated_at=updated_date)
    update_u = User.objects.filter(
        id=user_id).update(inc__operating_income=cost, updated_at=updated_date)
    user = User.objects.filter(id=user_id).first()
    portfolio = Portfolio.objects.filter(user_id=user.id).first()

    return {
        'data': {
            'id': str(user.id),
            'username': user.username,
            'gross_profit': user.gross_profit,
            'total_equity': user.total_equity,
            'portfolio': json.loads(portfolio.to_json())
        },
        'message': 'Success'
    }, 200


@app.route('/viewstock/<ticker>', methods=['GET'])
def viewstock(ticker):
    """Return company data with historical stock data"""

    res = db.execute("""SELECT * FROM company
    JOIN company_data ON company_data.company_id = company.id
    WHERE company.ticker = :ticker""", {'ticker': ticker}
                     )

    return {
        'data': [dict(r) for r in res],
        'message': 'success'
    }, 200


@app.route('/stocks', methods=['GET'])
def get_all_companies():
    """Returns a json list of all available companies with their ticker and industry"""
    s = select([Company.id, Company.co_name, Company.sector, Company.ticker])
    companies = db.execute(s).fetchall()

    return {
        'data': [dict(row) for row in companies],
        'message': 'Success'
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
            return {'data': None, 'message': 'User not found'}, 401
        elif not check_password_hash(exist_user.password, password):
            return {'data': None, 'message': 'Unauthorized'}, 401
        else:
            return {
                'data': {
                    'id': str(exist_user.id),
                    'username': exist_user.username,
                    'email': exist_user.email
                },
                'message': 'success!'
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
        Portfolio(balance=user.operating_income, user_id=user).save()
    except IntegrityError:
        return {'data': None, 'message': 'Email already exists'}, 401
    else:
        return {
            'data': {
                'id': str(user.id),
                'username': user.username,
                'email': user.email
            },
            'message': 'success!'
        }, 201
