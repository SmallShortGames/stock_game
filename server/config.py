from os import environ, path
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())


class Config(object):
    SECRET_KEY = environ.get('SECRET_KEY')


class Production(Config):
    TESTING = False
    FLASK_ENV = 'production'
    FLASK_DEBUG = False
    # DATABASE_URI = environ.get('PROD_DB_URI')


class Development(Config):
    FLASK_ENV = 'development'
    FLASK_DEBUG = True
    # DATABASE_URI = environ.get('DEV_DB_URI')


