from mongoengine import *
# from app.db import Base
from datetime import datetime
from app.models import Portfolio
# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
# from sqlalchemy.orm import validates


# List to use with enumeration data type "Enum"
sector_list = ['Communication Services', 'Consumer Discretionary', 'Consumer Staples', 'Energy', 'Financials', 'Healthcare', 'Industrials', 'Information Technology', 'Materials', 'Real Estate', 'Utilities']

'''
This model collates data for each company represented within the game;
- 'company_name' and 'ticker' are required values
- validation on 'sector' has been included to help test use of the Enum data type
'''

class Company(Document):
    # __tablename__ = 'company'
    id = IntField(required=True, null=False, unique=True, primary_key=True)
    company_name = StringField(max_length=30, null=False, required=True)
    ticker = StringField(max_length=5, required=True, null=False)
    sector = ListField(StringField(required=True, choices=sector_list, null=False, default="Communication Services"))
    ipo_date = DateTimeField(default=datetime.date)
    volatility = IntField(min_value=1, max_value=5)
    portfolio_id = ReferenceField(Portfolio)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow, onupdate=datetime.utcnow)


    # @validates('sector')
    def validate_sector(self, key, sector):
        assert company.sector() is sector_list
        return sector