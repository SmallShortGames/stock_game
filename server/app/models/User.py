from mongoengine import *
from datetime import datetime
from werkzeug.security import generate_password_hash
import re


class User(Document):
    '''
    This model collates all data pertaining to the user;
    - 'username', 'email', and 'password' are all required properties and limited to between 2 and 30, 6 and 50 and 6 and 255 characters, respectively.
    - 'portfolio_name' is a required, user-provided property and limited to between 2 and 50 characters
    - 'operating_income' will start at $50K per user per simulation
    - all properties with Numeric data types are limited to 15 digits with 2 digits following the decimal point
    - there is a ONE to MANY relationship between User and Portfolio
    '''
    username = StringField(max_length=30, required=True, null=False)
    email = StringField(max_length=50, required=True, unique=True, null=False)
    password = StringField(max_length=255, required=True, null=False)
    operating_income = DecimalField(precision=2)
    gross_profit = DecimalField(precision=2)
    total_equity = DecimalField(precision=2)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(
        default=datetime.utcnow, onupdate=datetime.utcnow)

    # @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError("Please enter your username.")
        if len(username) < 2 or len(username) > 30:
            raise AssertionError(
                "Your username must be between 2 and 30 characters long.")
        return username

    # @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError("You must provide an email address.")
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('Please enter a valid email address.')
        if User.objects(email=email):
            raise AssertionError('You must enter a unique email address.')
        if len(email) < 6 or len(email) > 50:
            raise AssertionError(
                "Your email address must be between 6 and 50 characters long.")
        return email

    # @classmethod
    def validate_password(self, key, password):
        assert len(password) > 6
        if not password:
            raise AssertionError("Please enter a password.")
        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            raise AssertionError(
                'Your password must contain at least one capital letter and one number.')
        # 4/30/21 - I kept the min password length to 6, happy to discuss - Josh
        if len(password) < 6 or len(password) > 255:
            raise AssertionError(
                "Your password must be between 6 and 50 characters long.")
        return generate_password_hash(password)
