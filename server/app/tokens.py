from flask import request
from functools import wraps
from app.models import User
from pymongo import *
import jwt
import datetime
import os


def encode_auth_token(user):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
            'iat': datetime.datetime.utcnow(),
            'sub': user
        }
        return jwt.encode(
            payload,
            os.environ.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as ex:
        return ex


def decode_token(token):
    try:
        payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignature:
        return 'Signature expired. Login again'
    except jwt.InvalidTokenError:
        return 'Invalid token. Login again'


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None

        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return {'data': '', 'message': 'a valid token is missing'}

        try:
            data = decode_token(token)
            current_user = User.User.objects(email=data['email']).first()
        except:
            return {'data': '', 'message': 'token invalid'}

        return f(current_user, *args, **kwargs)
    return decorator
