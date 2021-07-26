This is the working repo for the Flask API.

The React frontend can make API calls to this Flask API to do things like log in, log out, buy and sell stock. The Flask app then makes updates to the MySQL database.

TODO: include installation instructions here.

## .env Config

`MONGODB_URI=mongodb+srv://username:password@cluster0.j2wof.mongodb.net/your-db-name?retryWrites=true&w=majority`
`SECRET_KEY with a generated secret key (Not that important while testing)`
`MYSQL_DB=mysql+pymysql://username:password@localhost/database_name`

## Starting up server

1. Have python3 installed at least version 3.8
2. within server directory run the following command to create a virtual environment
   - macOS/Linux run `$ python3 -m venv venv`
   - Windows run `> python -m venv venv`
3. Once installed run the following command and start your virtual environment shell should look something like `(venv) $ ` after run successfully
   - macOS/Linux `$ . venv/bin/activate`
   - Windows `> .\venv\Scripts\activate`
4. Install all requirements needed
   - `pip install -r requirements.txt`
5. Set environment variables for Flask
   - bash `$ export FLASK_APP=app` then `$ export FLASK_ENV=development`
   - CMD `> set FLASK_APP=app` then `> set FLASK_ENV=development`
   - PowerShell `> $env:FLASK_APP = "app"` then `> $env:FLASK_ENV = "development"`
6. Run the server `flask run` and a similar output to this one will show
   ```
   * Serving Flask app "app"
   * Environment: development
   * Debug mode: on
   * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
   * Restarting with stat
   * Debugger is active!
   * Debugger PIN: 855-212-761
   ```
