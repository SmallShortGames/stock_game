from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import validates

sector_list = ['Communication Services', 'Consumer Discretionary', 'Consumer Staples', 'Energy', 'Financials', 'Healthcare', 'Industrials', 'Information Technology', 'Materials', 'Real Estate', 'Utilities']

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

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email
        return email