from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn
from app.courses.models import Courses

student_course=db.Table('student_course', 
                             db.Column('studentid', db.Integer,db.ForeignKey('students.id'), nullable=False),
                             db.Column('courseid',db.Integer,db.ForeignKey('courses.id'),nullable=False),
                             db.PrimaryKeyConstraint('studentid', 'courseid') )


class StudentCourse():

    def __init__(self,courseid,studentid):
        self.courseid=courseid
        self.studentid=studentid

        db.mapper(StudentCourse, student_course)


class Students(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    studentname = db.Column(db.String(250), nullable=False)
    degree = db.Column(db.String(250), nullable=False)
    major = db.Column(db.String(250), nullable=False)
    courses = db.relationship('Courses', secondary=student_course, backref='students')  
    def __init__(self,  studentname,  degree,  major):

        self.studentname = studentname
        self.degree = degree
        self.major = major

class StudentsSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    id = fields.Integer(dump_only=True)

    studentname = fields.String(validate=not_blank)
    degree = fields.String(validate=not_blank)
    major = fields.String(validate=not_blank)
    courseids = fields.Raw()
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/students/"
        else:
            self_link = "/students/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'students'
