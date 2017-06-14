// spec.js
describe('Testing Students CRUD Module', function() {

var Student = function() {
        
        var student_name = element(by.id('student_name'));
        this.setStudent_Name = function(student_nameText) { student_name.clear(); student_name.sendKeys(student_nameText); };
        
        var degree = element(by.id('degree'));
        this.setDegree = function(degreeText) { degree.clear(); degree.sendKeys(degreeText); };
        
        var major = element(by.id('major'));
        this.setMajor = function(majorText) { major.clear(); major.sendKeys(majorText); };

        var courses = element(by.id('courses'));
        this.setCourses = function(coursesText) { courses.clear(); courses.sendKeys(coursesText); };
        

        this.get = function() {
                                   browser.get('http://localhost:5000/');
                                       };

        this.toast = function(message){
                                        $('.btn.btn-primary').click()  // css selectors http://angular.github.io/protractor/#/api?view=build$
                                            .then(function() {
                                                  var EC = protractor.ExpectedConditions;
                                                  var toastMessage = $('.toast-message');
                                                  browser.wait(EC.visibilityOf(toastMessage), 6000) //wait until toast is displayed
                                                             .then(function(){
                                                                    expect(toastMessage.getText()).toBe(message);

                                                                        });
                                                                  });
                                    }
                    };

it('Should add a new Student', function() {

    var student = new Student();

    // Get students URL
    student.get();

    // Goto the new menu
    element(by.linkText('Students')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        student.setStudent_Name("Student Name");
        student.setDegree("Degree");
        student.setMajor("Major");
        student.setCourses("Courses");

    //Expectations
    student.toast("Student saved successfully");

  });

it('Should  edit a Student', function() {

    var student = new Student();

    student.get();

    //Goto the edit menu
    element(by.linkText('Students')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        student.setStudent_Name("Your Updated Title text here");
        student.setDegree("Your Updated Title text here");
        student.setMajor("Your Updated Title text here");
        post.setCourses("Your Updated Title text here");
    //Expectations
    student.toast("Update was a success");



});

it('Should  delete a Student', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Students')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Student deleted successfully")

      });

  });
});

  });
