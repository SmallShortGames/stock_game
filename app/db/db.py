from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

db = create_engine('sqlite:///test.db', echo=True)

Session = sessionmaker(bind=db)