import mongoengine
# from app.db import Base
from datetime import datetime
# from sqlalchemy import Column, Integer, DateTime, ForeignKey, Numeric
# from sqlalchemy.orm import validates

'''
This model collates data pertaining to status of each user's complete portfolio;
- 'balance' is required and limited to 15 digits, with two digits following the decimal point
- 'portfolio_name' is a required, user-provided property and limited to between 2 and 50 characters
- there is a MANY to ONE relationship between portfolio and user
- 'portfolio' has ONE to MANY relationships with 'company', 'position', and 'transaction'
'''
class Portfolio(EmbeddedDocument):
    # __tablename__ = 'portfolio'
    id = IntField(required=True, unique=True, primary_key=True)
    portfolio_name = StringField(max_length=50, required=True)
    balance = DecimalField(max_length=15, precision=2, nullable=False)
    user_id = ListField(EmbeddedDocumentField(User.id))
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow, onupdate=datetime.utcnow)

    @validates('portfolio_name')
    def validate_portfolio_name(self, key, username):
        if not portfolio_name:
            raise AssertionError("Please enter a name for your portfolio.")
        if len(portfolio_name) < 2 or len(username) > 50:
            raise AssertionError("Please choose a name for your portfolio that is between 2 and 50 characters long.")
        return portfolio_name