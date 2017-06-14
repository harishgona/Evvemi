from flask import Blueprint, request, jsonify, make_response
from app.students.models import Students, StudentsSchema
from flask_restful import Api, Resource
from app.basemodels import db
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from app.courses.models import Courses

students = Blueprint('students', __name__)
schema = StudentsSchema(strict=True)
api = Api(students)

class CreateListStudents(Resource):

    def get(self):
        students_query = Students.query.all()
        results = schema.dump(students_query, many=True).data
        i=0
        for student in students_query:
            student_course_ids = [course.coursename for course in student.courses]
            results['data'][i]['attributes']['courseids'] = student_course_ids
            i=i+1
        return results


    def post(self):
        raw_dict = request.get_json(force=True)
        try:
            schema.validate(raw_dict)
            request_dict = raw_dict['data']['attributes']
            student = Students(request_dict['studentname'], request_dict[
                               'degree'], request_dict['major'])
            student_courses = request_dict['courseids']
            for student_course in student_courses:
                course=Courses.query.get(student_course)
                student.courses.append(course)
            student.add(student)
            query = Students.query.get(student.id)
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


class GetUpdateDeleteStudent(Resource):


    def get(self, id):
        student_query = Students.query.get_or_404(id)
        result = schema.dump(student_query).data
        student_course_ids = [course.id for course in student_query.courses]
        result['data']['attributes']['courseids'] = student_course_ids
        return result

    def patch(self, id):
        student = Students.query.get_or_404(id)
        raw_dict = request.get_json(force=True)
        try:
            schema.validate(raw_dict)
            student_courses=[]
            for course in student.courses:
                student_courses.append(course.id)
            request_dict = raw_dict['data']['attributes']
            for key, value in request_dict.items():

                if key == "courses":
                    continue
                if key == "courseids":
                    for course_id in value:
                        if course_id not in student_courses:
                            course=Courses.query.get(course_id)
                            student.courses.append(course)
                    #Remove old post terms which are not included in the update.
                    for student_course_id in student_courses:
                        if student_course_id not in value:
                              course=Courses.query.get(student_course_id)
                              student.courses.remove(term)

                setattr(student, key, value)

            student.update()
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
        student = Students.query.get_or_404(id)
        try:
            delete = student.delete(student)
            response = make_response()
            response.status_code = 204
            return response

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp


api.add_resource(CreateListStudents, '.json')
api.add_resource(GetUpdateDeleteStudent, '/<int:id>.json')
