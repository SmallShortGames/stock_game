from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import validates

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    company_name = Column(String(30), nullable=False)
    website = Column(String(100))
    ticker = Column(String(5), nullable=False)
    industry = Column(Enum(50))
    sector = Column(Enum(50))
    ipo_date = Column(Date)
    last_price = Column(Numeric(8,2))
    volatility = Column(Integer)
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('industry')
    def validate_industry(self, key, industry):
        assert company.industry() is industry_list

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email

        return email