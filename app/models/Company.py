from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import validates

# List to use with enumeration data type "Enum"
sector_list = ['Communication Services', 'Consumer Discretionary', 'Consumer Staples', 'Energy', 'Financials', 'Healthcare', 'Industrials', 'Information Technology', 'Materials', 'Real Estate', 'Utilities']

'''
This model collates data for each company represented within the game;
- 'company_name' and 'ticker' are required values
- 'last_price' is limited to 8 digits, with two digits following the decimal point
- validation of 'sector' has been included to help test use of the Enum data type
- QUESTION: does "last_price" refer to the price of the stock at closing on the previous day? Or...?
- QUESTION: do we need a web address for a made-up company? Or is this in reference to where the historical data is being pulled from?
'''
class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    company_name = Column(String(30), nullable=False)
    website = Column(String(100))
    ticker = Column(String(5), nullable=False)
    sector = Column(Enum(sector_list, name="sector"), default="Communication Services")
    ipo_date = Column(Date)
    last_price = Column(Numeric(8,2))
    volatility = Column(Integer)
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('sector')
    def validate_sector(self, key, sector):
        assert company.sector() is sector_list
        return sector