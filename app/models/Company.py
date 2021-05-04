from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric, Date
from sqlalchemy.orm import validates

# List to use with enumeration data type "Enum"
sector_list = ['Communication Services', 'Consumer Discretionary', 'Consumer Staples', 'Energy', 'Financials', 'Healthcare', 'Industrials', 'Information Technology', 'Materials', 'Real Estate', 'Utilities']

'''
This model collates data for each company represented within the game;
- 'company_name' and 'ticker' are required values
- validation on 'sector' has been included to help test use of the Enum data type
'''
class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    company_name = Column(String(30), nullable=False)
    ticker = Column(String(5), nullable=False)
    sector = Column(Enum('Communication Services', 'Consumer Discretionary', 'Consumer Staples', 'Energy', 'Financials', 'Healthcare', 'Industrials', 'Information Technology', 'Materials', 'Real Estate', 'Utilities', name="sector"), default="Communication Services")
    ipo_date = Column(Date)
    volatility = Column(Integer)
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('sector')
    def validate_sector(self, key, sector):
        assert company.sector() is sector_list
        return sector