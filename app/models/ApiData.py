from mongoengine import *
from datetime import datetime

class ApiData(Document):
    id = IntField(required=True, unique=True, primary_key=True)
    company_name = StringField(max_length=30, required=True)
    price = DecimalField(max_length=15, precision=2, nullable=False)