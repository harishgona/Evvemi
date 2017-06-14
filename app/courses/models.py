from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn


class Courses(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    coursename = db.Column(db.String(250), nullable=False)

    def __init__(self,  coursename, ):

        self.coursename = coursename


class CoursesSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    id = fields.Integer(dump_only=True)

    coursename = fields.String(validate=not_blank)

    def get_top_level_links(self, data, many):
        if many:
            self_link = "/courses/"
        else:
            self_link = "/courses/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'courses'
