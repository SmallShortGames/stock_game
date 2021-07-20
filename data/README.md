## .env config

MYSQL_DB=mysql+pymysql://`username:password@localhost/database_name`

## add dataset

1. Have python3 installed
2. Have mysql installed and running 
   * bash: `mysql -u username -p`
   * mysql> `CREATE DATABASE datbase_name` (make sure database_name matches that used within schema.sql)
   * mysql> `USE database_name`
3. install SQLAlchemy and pymysql
4. update mvp_df to a .csv file
4. run bash `python3 comp_api.py` or windows/powershell `python comp_api.py`
   - be prepared to wait for about 5 minutes for dataset to run
