import mongoengine
# from app.db import Base
from datetime import datetime
# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
# from sqlalchemy.orm import validates

'''
This model collates data related to the user's current holdings of a particular stock;
- positions have MANY to ONE relationships with user portfolios
- all dollar-related values on this model are limited to 15 digits, with two digits following the decimal point
'''
class Position(Base):
    # __tablename__ = 'position'
    id = IntField(required=True, unique=True, primary_key=True)
    volume = DecimalField(max_length=15, precision=2) 
    current_cost = DecimalField(max_length=15, precision=2)
    avg_cost = DecimalField(max_length=15, precision=2)
    quantity = IntField()
    equity = DecimalField(max_length=15, precision=2)
    current_return = DecimalField(max_length=15, precision=2)
    total_return = DecimalField(max_length=15, precision=2)
    portfolio_id = ListField(EmbeddedDocumentField(Portfolio.id), required=True, nullable=False)
    company_id = ListField(EmbeddedDocumentField(Company.id), required=True, nullable=False)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow, onupdate=datetime.utcnow)
