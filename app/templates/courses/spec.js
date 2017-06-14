describe('Testing Courses CRUD Module', function() {

var Course = function() {
        
        var coursename = element(by.id('coursename'));
        this.setcoursename = function(coursenameText) { coursename.clear(); coursename.sendKeys(coursenameText); };
        

        this.get = function() {
                                   browser.get('http://localhost:5000/');
                                       };

        this.toast = function(message){
                                        $('.btn.btn-primary').click() 
                                            .then(function() {
                                                  var EC = protractor.ExpectedConditions;
                                                  var toastMessage = $('.toast-message');
                                                  browser.wait(EC.visibilityOf(toastMessage), 6000) 
                                                             .then(function(){
                                                                    expect(toastMessage.getText()).toBe(message);

                                                                        });
                                                                  });
                                    }
                    };

it('Add Course', function() {

    var course = new Course();

    course.get();

    element(by.linkText('Courses')).click();
    element(by.linkText('New')).click();

    course.setcoursename("");

    course.toast("Course saved successfully");

});

it('Edit Course', function() {

    var course = new Course();

    course.get();
    element(by.linkText('Courses')).click();
    element(by.id('editButton')).click();

    course.setcoursename("");
    course.toast("Update was a success");



});

it('Delete Course', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Courses')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60)
            .then(function(){

                expect(toastMessage.getText()).toBe("Course deleted successfully")

            });

    });
  });

});
