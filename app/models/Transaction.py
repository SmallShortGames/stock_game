from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Numeric, Enum, Boolean
from sqlalchemy.orm import validates

# List to use with enumeration data type "Enum"
exchange_list = ['American Stock Exchange (AMEX)', 'National Association of Securities Dealers (NASDAQ)', 'New York Stock Exchange (NYSE)']

'''
This model collates data related to making a purchase or selling a stock;
- e.g. a sale is indicated by 'buy_side = false'
- transactions have a MANY to ONE relationships with user portfolios
- prices are limited to 8 digits, with two digits following the decimal point
- stock quantities (keeping in mind penny stocks are allowed) are limited to 20 digits per transaction
- validation on 'exchange' has been included to help test use of Enum data-type
'''
class Transaction(Base):
    __tablename__ = 'transaction'
    id = Column(Integer, primary_key=True)
    buy_side = Column(Boolean)
    price = Column(Numeric(8,2), nullable=False)
    exchange = Column(Enum('American Stock Exchange (AMEX)', 'National Association of Securities Dealers (NASDAQ)', 'New York Stock Exchange (NYSE)', name="exchange"), default="American Stock Exchange (AMEX)")
    quantity = Column(Integer)
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('exchange')
    def validate_industry(self, key, exchange):
        assert company.exchange() is exchange_list
        return exchange
