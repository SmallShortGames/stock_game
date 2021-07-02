from mongoengine import *
from datetime import datetime
from app.models import Portfolio, Company

'''
This model collates data related to the user's current holdings of a particular stock;
- positions have MANY to ONE relationships with user portfolios
- all dollar-related values on this model are limited to 15 digits, with two digits following the decimal point
'''


class Position(Document):
    volume = DecimalField(max_length=15, precision=2)
    current_cost = DecimalField(max_length=15, precision=2)
    avg_cost = DecimalField(max_length=15, precision=2)
    quantity = IntField()
    equity = DecimalField(max_length=15, precision=2)
    current_return = DecimalField(max_length=15, precision=2)
    total_return = DecimalField(max_length=15, precision=2)
    portfolio_id = ReferenceField(Portfolio)
    # company_id = ReferenceField(Company)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(
        default=datetime.utcnow, onupdate=datetime.utcnow)
