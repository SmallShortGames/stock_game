from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import validates

'''
This model collates data pertaining to status of each user's complete portfolio;
- 'balance' is required and limited to 15 digits, with two digits following the decimal point
- 'portfolio_name' is a required, user-provided property and limited to between 2 and 50 characters
- there is a ONE to ONE relationship between portfolio and user (QUESTION: should this by MANY to ONE?)
- 'portfolio' has ONE to MANY relationships with 'company', 'position', and 'transaction'
'''
class Portfolio(Base):
    __tablename__ = 'portfolio'
    id = Column(Integer, primary_key=True)
    portfolio_name = Column(String(50), nullable=False)
    balance = Column(Numeric(15,2), nullable=False) 
    user_id = Column(Integer, ForeignKey('user.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('portfolio_name')
    def validate_portfolio_name(self, key, username):
        if not portfolio_name:
            raise AssertionError("Please enter a name for your portfolio.")
        if len(portfolio_name) < 2 or len(username) > 50:
            raise AssertionError("Please choose a name for your portfolio that is between 2 and 50 characters long.")
        return portfolio_name