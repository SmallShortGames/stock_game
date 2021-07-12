from app.db import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Numeric
from sqlalchemy.orm import validates


class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    co_name = Column(String(50), nullable=False, unique=True)
    ticker = Column(String(5))
    sector = Column(String(50))
    per = Column(String(5))
    ipo_date = Column(Date)


class Company_Data(Base):
    __tablename__ = 'company_data'
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company.id'))
    date_ = Column(Date)
    time_ = Column(Integer)
    daily_open = Column(Numeric(8, 5))
    high = Column(Numeric(8, 5))
    low = Column(Numeric(8, 5))
    daily_close = Column(Numeric(8, 5))
    vol = Column(Integer)
    volatility = Column(Numeric(20, 20))

    def __json__(self):
        return ['daily_open', 'high', 'low', 'daily_close', 'volatility']
