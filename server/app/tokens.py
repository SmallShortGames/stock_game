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
        payload = jwt.decode(token, os.environ.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignature:
        return 'Signature expired. Login again'
    except jwt.InvalidTokenError:
        return 'Invalid token. Login again'
