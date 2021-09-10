from flask import Blueprint, request, Response, jsonify, json, session
from app.models import User, Portfolio, Position, Company, Transaction
from app.db import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from app.tokens import encode_token, decode_token, token_required

bp = Blueprint('api', __name__, url_prefix='/api')
db = Session()


@bp.route('/buy', methods=['PUT'])
@token_required
def buy(token):
    """Buy route will embed a transaction document within the portfolio class along
    with either embedding a new position document or updating an existing position"""
    user_id = request.json['id']  # user id
    company = request.json['company']  # company ticker
    cost = request.json['cost']  # total cost
    quantity = request.json['quantity']  # desired int

    if str(token.id) != user_id:
        return {'data': '', 'message': 'Server Error please try again later.'}, 400
    # query is a work in progress
    updated_date = datetime.utcnow
    res = db.query(Company.Company).filter_by(ticker=company).first()
    new_transaction = Transaction.Transaction(
        price=cost, quantity=quantity, company=res.co_name)
    new_position = Position.Position(current_cost=cost / quantity, avg_cost=cost / quantity, quantity=quantity,
                                     current_return=0, total_return=0, company_id=res.id,
                                     company_ticker=res.ticker, company_name=res.co_name)
    existing_port = Portfolio.Portfolio.objects.filter(user_id=user_id).first()

    if len(existing_port.positions) == 0:
        updated = existing_port.update(add_to_set__positions=new_position)
    else:
        for pos in existing_port.positions:
            if pos.company_name == new_position.company_name:
                pos.avg_cost = (float(pos.current_cost) + cost / quantity) / 2
                pos.current_cost = cost / quantity
                pos.quantity += quantity
                pos.updated_at = updated_date
                break
        existing_port.save()

    update_p = Portfolio.Portfolio.objects.filter(user_id=user_id).update(
        add_to_set__transactions=new_transaction, dec__balance=cost, updated_at=updated_date)
    update_u = User.User.objects.filter(
        id=user_id).update(dec__operating_income=cost, updated_at=updated_date)

    user = User.User.objects.filter(id=user_id).first()
    portfolio = Portfolio.Portfolio.objects.filter(user_id=user.id).first()

    return {
        'data': {
            'id': user.id,
            'username': user.username,
            'gross_profit': user.gross_profit,
            'total_equity': user.total_equity,
            'portfolio': json.loads(portfolio.to_json())
        },
        'message': 'Success'
    }, 200


@bp.route('/sell', methods=['PUT'])
@token_required
def sell(token):
    """Sell route will subtract the quantity of the given stock and embed a new
    transaction document within the portfolio"""
    user_id = request.json['id']  # user id
    company = request.json['company']  # company ticker
    cost = request.json['cost']  # total cost
    quantity = request.json['quantity']  # desired int

    if str(token.id) != user_id:
        return {'data': '', 'message': 'Server Error please try again later.'}, 400
    # query is a work in progress
    updated_date = datetime.utcnow
    res = db.query(Company).filter_by(ticker=company).first()
    new_transaction = Transaction.Transaction(buy_side=False, price=cost,
                                              quantity=quantity, company=res.co_name)
    new_position = Position.Position(current_cost=cost / quantity, avg_cost=cost / quantity, quantity=quantity,
                                     current_return=0, total_return=0, company_id=res.id,
                                     company_ticker=res.ticker, company_name=res.co_name)
    existing_port = Portfolio.Portfolio.objects.filter(user_id=user_id).first()

    if len(existing_port.positions) == 0:
        return {'data': {}, 'message': 'Failure to find current amount. This is likely an error in the server'}, 400
    else:
        for pos in existing_port.positions:
            if pos.company_name == new_position.company_name:
                pos.avg_cost = (float(pos.current_cost) + cost / quantity) / 2
                pos.current_cost = cost / quantity
                if pos.quantity - quantity < 0:
                    return {'data': {}, 'message': 'Insufficient quantity held please try again'}, 400
                pos.quantity -= quantity
                pos.updated_at = updated_date
                break
        existing_port.save()

    update_p = Portfolio.Portfolio.objects.filter(user_id=user_id).update(
        add_to_set__transactions=new_transaction, inc__balance=cost, updated_at=updated_date)
    update_u = User.User.objects.filter(
        id=user_id).update(inc__operating_income=cost, updated_at=updated_date)
    user = User.User.objects.filter(id=user_id).first()
    portfolio = Portfolio.Portfolio.objects.filter(user_id=user.id).first()

    return {
        'data': {
            'id': user.id,
            'username': user.username,
            'gross_profit': user.gross_profit,
            'total_equity': user.total_equity,
            'portfolio': json.loads(portfolio.to_json())
        },
        'message': 'Success'
    }, 200


@bp.route('/viewstock/<ticker>', methods=['GET'])
def viewstock(ticker):
    """Return company data with historical stock data"""

    res = db.execute("""SELECT * FROM company
    JOIN company_data ON company_data.company_id = company.id
    WHERE company.ticker = :ticker""", {'ticker': ticker}
                     )

    return {
        'data': [dict(r) for r in res],
        'message': 'success'
    }, 200


@bp.route('/stocks', methods=['GET'])
def get_all_companies():
    """Returns a json list of all available companies with their ticker and industry"""
    s = select([Company.Company.id, Company.Company.co_name,
               Company.Company.sector, Company.Company.ticker])
    companies = db.execute(s).fetchall()

    return {
        'data': [dict(row) for row in companies],
        'message': 'Success'
    }, 200
