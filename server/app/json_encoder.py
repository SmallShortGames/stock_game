from sqlalchemy.ext.declarative import DeclarativeMeta
from flask import json
from bson import ObjectId
import decimal


class CompanyJsonEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o.__class__, DeclarativeMeta):
            d = {}
            fields = o.__json__() if hasattr(o, '__json__') else dir(o)
            for field in [f for f in fields if not f.startswith('_') and f not in ['metadata', 'query', 'query_class']]:
                value = o.__getattribute__(field)
                try:
                    json.dumps(value)
                    d[field] = value
                except TypeError:
                    d[field] = None
            return d
        elif type(o) is decimal.Decimal:
            return float(o)
        elif isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
