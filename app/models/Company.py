from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import validates

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    company_name = Column(String(30), nullable=False)
    website = Column(String(100))
    ticker = Column(String(5), nullable=False)
    industry = Column(String(100))
    sector = Column(String(100))
    ipo_date = Column(DateTime)
    last_price = Column(Numeric(8,2))
    portfolio_id = Column(ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
