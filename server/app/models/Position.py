from mongoengine import *
from datetime import datetime
from app.models import Portfolio


class Position(EmbeddedDocument):
    '''
    This model collates data related to the user's current holdings of a particular stock;
    - positions have MANY to ONE relationships with user portfolios
    - all dollar-related values on this model are limited to 15 digits, with two digits following the decimal point
    '''
    current_cost = DecimalField(precision=2)
    avg_cost = DecimalField(precision=2)
    quantity = IntField()
    equity = DecimalField(precision=2)
    current_return = DecimalField(precision=2)
    total_return = DecimalField(precision=2)
    company_id = IntField()
    company_ticker = StringField(max_length=6)
    company_name = StringField(max_length=55, primary_key=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(
        default=datetime.utcnow, onupdate=datetime.utcnow)
