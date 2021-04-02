from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, static_url_path='/')
    app.url_map.strict_slashes = False
    app.config.from_mapping(
        SECRET_KEY='noone_knows'
    )

    @app.route('/hello')
    def hello():
        return 'test connect'

    return app