#!/bin/bash



#TESTS
#Tests for courses
protractor  app/templates/courses/conf.js  &&
python app/courses/test_courses.py
#End Tests for courses
#Tests for students
protractor  app/templates/students/conf.js  &&
python app/students/test_students.py
#End Tests for students

