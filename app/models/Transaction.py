from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Numeric, Enum, Boolean
from sqlalchemy.orm import validates

exchange_list = ['American Stock Exchange (AMEX)', 'National Association of Securities Dealers (NASDAQ)', 'New York Stock Exchange (NYSE)']

class Transaction(Base):
    __tablename__ = 'transaction'
    id = Column(Integer, primary_key=True)
    buy_side = Column(Boolean)
    price = Column(Numeric(8,2), nullable=False)
    exchange = Column(Enum(exchange_list, name="exchange"), default="American Stock Exchange (AMEX)")
    quantity = Column(Integer(20,2))
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('exchange')
    def validate_industry(self, key, exchange):
        assert company.exchange() is exchange_list
        return exchange
