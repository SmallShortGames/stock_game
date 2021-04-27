from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import validates

class Position(Base):
    __tablename__ = 'position'
    id = Column(Integer, primary_key=True)
    ticker = Column(String(5), nullable=False)
    volume = Column(Numeric(15,2)) 
    current_cost = Column(Numeric(15,2))
    avg_cost = Column(Numeric(15,2))
    portfolio_id = Column(ForeignKey('portfolio.id'))
    quantity = Column(Integer)
    equity = Column(Numeric(15,2))
    current_return = Column(Numeric(15,2))
    total_return = Column(Numeric(15,2))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
