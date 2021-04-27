from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Numeric
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(50), nullable=False)
    operating_income = Column(Numeric(15,2))
    gross_profit = Column(Numeric(15,2))
    total_equity = Column(Numeric(15,2))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email

        return email

    @validates('password')
    def validate_password(self, key, password):
        assert len(password) > 6

        return generate_password_hash(password)


