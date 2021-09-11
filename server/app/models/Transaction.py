from mongoengine import *
from datetime import datetime
from app.models import Portfolio

# List to use with enumeration data type "Enum"
exchange_list = [
    'American Stock Exchange (AMEX)', 'National Association of Securities Dealers (NASDAQ)', 'New York Stock Exchange (NYSE)']

class Transaction(EmbeddedDocument):
    '''
    This model collates data related to making a purchase or selling a stock;
    - e.g. a sale is indicated by 'buy_side = false'
    - transactions have a MANY to ONE relationships with user portfolios
    - prices are limited to 8 digits, with two digits following the decimal point
    - stock quantities (keeping in mind penny stocks are allowed) are limited to 20 digits per transaction
    - validation on 'exchange' has been included to help test use of Enum data-type
    '''
    buy_side = BooleanField(default=True)
    company = StringField(required=True, max_length=55)
    exchange = ListField(StringField(required=True, choices=exchange_list,
                         null=False, default="American Stock Exchange (AMEX)"))
    price = DecimalField(precision=2, required=True, null=False)
    quantity = IntField(required=True, null=False)
    created_at = DateTimeField(default=datetime.utcnow)

    # @validates('exchange')

    def validate_industry(self, key, exchange):
        assert company.exchange() is exchange_list
        return exchange
