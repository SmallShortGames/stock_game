from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import validates

class Transaction(Base):
    __tablename__ = 'transaction'
    id = Column(Integer, primary_key=True)
    buy_side = Column(Boolean)
    price = Column(Numeric(8,2), nullable=False)
    exchange = Column(String(50))
    quantity = Column(Integer(20,2))
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
