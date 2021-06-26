from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv, find_dotenv
from os import environ
import pymysql

load_dotenv(find_dotenv())

Base = declarative_base()

db = create_engine(environ.get('MYSQL_DB'), echo=True)

Session = sessionmaker(bind=db)
