from app.db import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Numeric
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash

'''
This model collates all data pertaining to the user;
- 'username', 'email', and 'password' are all required properties and limited to between 2 and 30, 6 and 50 and 6 and 255 characters, respectively.
- 'portfolio_name' is a required, user-provided property and limited to between 2 and 50 characters
- 'operating_income' will start at $50K per user per simulation
- all properties with Numeric data types are limited to 15 digits with 2 digits following the decimal point
- there is a ONE to ONE relationship between User and Portfolio (QUESTION: should this by ONE to MANY?)
'''
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(30), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    operating_income = Column(Numeric(15,2))
    gross_profit = Column(Numeric(15,2))
    total_equity = Column(Numeric(15,2))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError("Please enter your username.")
        if len(username) < 2 or len(username) > 30:
            raise AssertionError("Your username must be between 2 and 30 characters long.")
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError("You must provide an email address.")
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('Please enter a valid email address.')
        # if User.query.filter(User.email == email).first():
        #     raise AssertionError('You must enter a unique email address.')
        if len(email) < 6 or len(email) > 50:
            raise AssertionError("Your email address must be between 6 and 50 characters long.")
        return email

    @validates('password')
    def validate_password(self, key, password):
        assert len(password) > 6
        if not password:
            raise AssertionError("Please enter a password.")
        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            raise AssertionError('Your password must contain at least one capital letter and one number.')
        if len(password) < 6 or len(password) > 255:
            raise AssertionError("Your email address must be between 4 and 50 characters long.")
        return generate_password_hash(password)