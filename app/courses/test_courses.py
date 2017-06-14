# http://werkzeug.pocoo.org/docs/0.11/test/#werkzeug.test.Client
# http://flask.pocoo.org/docs/0.10/api/#test-client

import unittest
import os
import sys
import json

# Add app path to module path
sys.path.append(os.path.dirname(os.path.realpath(__file__).rsplit('/', 2)[0]))
from app import create_app
#from app.courses.models import Courses


app = create_app('config')
add_data = """{
  "data": {
    "attributes":

    {"course_name": "test string"}
         ,

    "type": "courses"
  }

}"""

update_data = """{
  "data": {
    "attributes":

        {"course_name": "test string"},
    "type": "courses"
  }

}"""


class TestCourses(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_01_add(self):

        rv = self.app.post('/api/v1/courses.json',
                           data=add_data, content_type="application/json")
        assert rv.status_code == 201

    def test_02_read_update(self):
        request = self.app.get('/api/v1/courses.json')
        dict = json.loads(request.data.decode('utf-8'))
        id = dict['data'][0]['id']
        rv = self.app.patch('/api/v1/courses/{}.json'.format(id),
                            data=update_data, content_type="application/json")
        assert rv.status_code == 200

    def test_03_delete(self):
        request = self.app.get('/api/v1/courses.json')
        dict = json.loads(request.data.decode('utf-8'))
        id = dict['data'][0]['id']
        rv = self.app.delete('/api/v1/courses/{}.json'.format(id))
        assert rv.status_code == 204

if __name__ == '__main__':
    unittest.main()
