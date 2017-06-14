from flask import Blueprint, request, jsonify, make_response
from app.courses.models import Courses, CoursesSchema
from flask_restful import Api, Resource
from app.basemodels import db
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError

courses = Blueprint('courses', __name__)
schema = CoursesSchema(strict=True)
api = Api(courses)


class CreateListCourses(Resource):
    def get(self):
        courses_query = Courses.query.all()
        results = schema.dump(courses_query, many=True).data
        return results

    def post(self):
        raw_dict = request.get_json(force=True)
        try:
            schema.validate(raw_dict)
            request_dict = raw_dict['data']['attributes']
            course = Courses(request_dict['coursename'],)
            course.add(course)
            query = Courses.query.get(course.id)
            results = schema.dump(query).data
            return results, 201

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp


class GetUpdateDeleteCourse(Resource):


    def get(self, id):
        course_query = Courses.query.get_or_404(id)
        result = schema.dump(course_query).data
        return result


    def patch(self, id):
        course = Courses.query.get_or_404(id)
        raw_dict = request.get_json(force=True)
        try:
            schema.validate(raw_dict)
            request_dict = raw_dict['data']['attributes']
            for key, value in request_dict.items():
                setattr(course, key, value)

            course.update()
            return self.get(id)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp


    def delete(self, id):
        course = Courses.query.get_or_404(id)
        try:
            delete = course.delete(course)
            response = make_response()
            response.status_code = 204
            return response

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp


api.add_resource(CreateListCourses, '.json')
api.add_resource(GetUpdateDeleteCourse, '/<int:id>.json')
