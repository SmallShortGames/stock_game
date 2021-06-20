from mongoengine import *
from datetime import datetime
from app.models import Portfolio

# List to use with enumeration data type "Enum"
exchange_list = [
    'American Stock Exchange (AMEX)', 'National Association of Securities Dealers (NASDAQ)', 'New York Stock Exchange (NYSE)']

'''
This model collates data related to making a purchase or selling a stock;
- e.g. a sale is indicated by 'buy_side = false'
- transactions have a MANY to ONE relationships with user portfolios
- prices are limited to 8 digits, with two digits following the decimal point
- stock quantities (keeping in mind penny stocks are allowed) are limited to 20 digits per transaction
- validation on 'exchange' has been included to help test use of Enum data-type
'''


class Transaction(Document):
    buy_side = BooleanField(default=True)
    exchange = ListField(StringField(required=True, choices=exchange_list,
                         null=False, default="American Stock Exchange (AMEX)"))
    price = DecimalField(max_length=8, precision=2, required=True, null=False)
    quantity = DecimalField(max_length=20, precision=2,
                            required=True, null=False)
    portfolio_id = ReferenceField(Portfolio)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(
        default=datetime.utcnow, onupdate=datetime.utcnow)

    # @validates('exchange')

    def validate_industry(self, key, exchange):
        assert company.exchange() is exchange_list
        return exchange
