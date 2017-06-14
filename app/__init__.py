from flask import Flask

def create_app(config_filename):
    app = Flask(__name__, static_folder='templates/static')
    app.config.from_object(config_filename)
    from app.basemodels import db
    db.init_app(app)

    from flask import render_template, send_from_directory
    import os


    @app.route('/<path:filename>')
    def file(filename):
        return send_from_directory(os.path.join(app.root_path, 'templates'), filename)

    @app.route('/')
    def index():
        return render_template('index.html')

    from app.courses.views import courses
    app.register_blueprint(courses, url_prefix='/api/v1/courses')
    from app.students.views import students
    app.register_blueprint(students, url_prefix='/api/v1/students')

    return app
