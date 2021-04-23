from os import environ, path
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

class Config(object):
    SECRET_KEY = os.environ("SECRET_KEY")
    
class Production(Config):
    TESTING = False
    FLASK_ENV = 'production'
    DEVELOPMENT = False
    DEBUG = False
    DATABASE_URI = os.environ('PROD_DB_URI')

    
class Development(Config):
    FLASK_ENV = 'development'
    DEVELOPMENT = True
    DEBUG = True
    DATABASE_URI = os.environ('DEV_DB_URI')