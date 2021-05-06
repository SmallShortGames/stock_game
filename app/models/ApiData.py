import mongoengine
from datetime import datetime

class ApiData(Document):
    id = IntField(required=True, unique=True, primary_key=True)
    company_name = StringField(max_length=30, required=True)
    price = 