from flask import Blueprint, request, make_response, jsonify, json, session
from app.models import User, Portfolio, Position, Company, Transaction
from werkzeug.security import check_password_hash, generate_password_hash
from app.tokens import encode_token, decode_token, token_required

bp = Blueprint('user', __name__, url_prefix='/user')


@bp.route('/', methods=["GET"])
@token_required
def user_profile(token):
    """User profile route for a central location for user stats and position data"""
    try:
        user = User.User.objects(id=token.id).first()
        portfolio = Portfolio.Portfolio.objects(user_id=user.id).first()
    except AttributeError:
        print('error')
    else:
        return {
            'data': {
                'id': user.id,
                'username': user.username,
                'gross_profit': user.gross_profit,
                'total_equity': user.total_equity,
                'portfolio': json.loads(portfolio.to_json())
            },
            'message': 'success'
        }, 200


@bp.route('/login', methods=["POST"])
def login():
    """Login route checks to see if a users email
    exists then checks to verify password hash matches"""
    email = request.json['email']
    password = request.json['password']

    try:
        exist_user = User.User.objects.filter(email=email).first()
    except AttributeError:
        print("error")
    else:
        token = encode_token({'id': str(exist_user.id), 'email': exist_user.email})
        if exist_user is None:
            return {'data': None, 'message': 'User not found'}, 401
        elif not check_password_hash(exist_user.password, password):
            return {'data': None, 'message': 'Unauthorized'}, 401
        else:
            resp = make_response({
                'data': {
                    'id': exist_user.id,
                    'username': exist_user.username,
                    'email': exist_user.email,
                },
                'message': 'success!'
            })
            resp.headers['x-access-tokens'] = token
            return resp, 200


@bp.route('/register', methods=["POST"])
def register():
    """User registration route"""
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    new_user = User.User()
    new_user.username = username
    new_user.email = email
    new_user.password = generate_password_hash(password)
    new_user.operating_income = 50000.00
    new_user.gross_profit = 0.00
    new_user.total_equity = 50000.00
    try:
        new_user.save()
        user = User.User.objects.filter(email=email).first()
        Portfolio.Portfolio(balance=user.operating_income, user_id=user).save()
    except IntegrityError:
        return {'data': None, 'message': 'Email already exists'}, 401
    else:
        return {
            'data': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            },
            'message': 'success!'
        }, 201
