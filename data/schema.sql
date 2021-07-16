DROP DATABASE IF EXISTS stockdata;
CREATE DATABASE stockdata;
USE stockdata;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS company_data;
CREATE TABLE company (
	id int not null auto_increment primary key,
	sector VARCHAR(50),
	ticker VARCHAR(5),
	co_name VARCHAR(50) unique,
	per VARCHAR(5),
	ipo_date DATE
);
CREATE TABLE company_data (
  id int not null auto_increment primary key,
  company_id int not null, 
  index comp_id (company_id),
  date_ date,
  time_ INT,
	daily_open DECIMAL(10,5),
	high DECIMAL(10,5),
	low DECIMAL(10,5),
	daily_close DECIMAL(10,5),
	vol INT,
	volatility DECIMAL(20,20),
  Constraint fk_company foreign key (company_id) references company(id)
);