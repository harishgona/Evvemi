from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn


class Students(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    studentname = db.Column(db.String(250), nullable=False)
    degree = db.Column(db.String(250), nullable=False)
    major = db.Column(db.String(250), nullable=False)

    def __init__(self,  studentname,  degree,  major, ):

        self.studentname = studentname
        self.degree = degree
        self.major = major


class StudentsSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
    id = fields.Integer(dump_only=True)

    studentname = fields.String(validate=not_blank)
    degree = fields.String(validate=not_blank)
    major = fields.String(validate=not_blank)

    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/students/"
        else:
            self_link = "/students/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'students'
