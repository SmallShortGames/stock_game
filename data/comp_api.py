from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Enum, Numeric, Date
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
import pymysql
import csv
from datetime import date
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
# db_string = f"postgres://postgres:{db_password}@127.0.0.1:5432/Stocks_Game_db"

db_string = os.environ.get('MYSQL_DB')

engine = create_engine(db_string, echo=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    co_name = Column(String(50), nullable=False)
    # co_name = Column(String(50), nullable=False, unique=True)
    ticker = Column(String(5))
    sector = Column(String(50))
    per = Column(String(5))
    ipo_date = Column(Date)


class Company_Data(Base):
    __tablename__ = 'company_data'
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company.id'))
    date_ = Column(Date)
    time_ = Column(Integer)
    daily_open = Column(Numeric(8, 5))
    high = Column(Numeric(8, 5))
    low = Column(Numeric(8, 5))
    daily_close = Column(Numeric(8, 5))
    vol = Column(Integer)
    volatility = Column(Numeric(20, 20))

# Base.metadata.create_all(bind=engine)

company_dict = {}
data_dict = {}

# keys
# SECTOR,TICKER,NAME,PER,DATE,TIME,OPEN,HIGH,LOW,CLOSE,VOL,VOLATILITY,IPO_DATE
with open("./mvp_df.csv") as f:
    reader = csv.DictReader(f)

    for row in reader:
        if row['TICKER'] not in company_dict:
            company_dict[row['TICKER']] = {
                'co_name': row['NAME'], 'sector': row['SECTOR'], 'per': row['PER'], 'ipo_date': row['IPO_DATE']}

        if row['TICKER'] not in data_dict:
            data_dict[row['TICKER']] = {}

            data_dict[row['TICKER']][row['DATE']] = {'time_': row['TIME'], 'daily_open': row['OPEN'], 'high': row['HIGH'],
                                                     'low': row['LOW'], 'daily_close': row['CLOSE'], 'vol': row['VOL'], 'volatility': row['VOLATILITY']}
        else:
            data_dict[row['TICKER']][row['DATE']] = {'time_': row['TIME'], 'daily_open': row['OPEN'], 'high': row['HIGH'],
                                                     'low': row['LOW'], 'daily_close': row['CLOSE'], 'vol': row['VOL'], 'volatility': row['VOLATILITY']}

with Session() as session:

    for key in company_dict:
        session.add(Company(co_name=company_dict[key]['co_name'],
                            sector=company_dict[key]['sector'],
                            ticker=key,
                            per=company_dict[key]['per'],
                            ipo_date=company_dict[key]['ipo_date']))
        session.commit()

    for ticker in data_dict:
        company = session.query(Company).filter_by(ticker=ticker).first()
        for dt in data_dict[ticker]:
            session.add(Company_Data(company_id=company.id,
                                     date_=dt,
                                     time_=data_dict[ticker][dt]['time_'],
                                     daily_open=data_dict[ticker][dt]['daily_open'],
                                     high=data_dict[ticker][dt]['high'],
                                     low=data_dict[ticker][dt]['low'],
                                     daily_close=data_dict[ticker][dt]['daily_close'],
                                     vol=data_dict[ticker][dt]['vol'],
                                     volatility=data_dict[ticker][dt]['volatility']))
    session.commit()


