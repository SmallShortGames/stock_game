from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import validates

'''
This model collates data related to the user's current holdings of a particular stock;
- each player begins simulation with $50K
- positions have MANY to ONE relationships with user portfolios
- all dollar-related values on this model are limited to 15 digits, with two digits following the decimal point
- QUESTION: do property attributes have to be reasserted on foreign keys (e.g. ticker --> String and length of String?)
'''
class Position(Base):
    __tablename__ = 'position'
    id = Column(Integer, primary_key=True)
    volume = Column(Numeric(15,2)) 
    current_cost = Column(Numeric(15,2))
    avg_cost = Column(Numeric(15,2))
    quantity = Column(Integer)
    equity = Column(Numeric(15,2))
    current_return = Column(Numeric(15,2))
    total_return = Column(Numeric(15,2))
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    ticker = Column(String(5), ForeignKey('company.ticker'), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)