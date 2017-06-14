// spec.js
describe('Testing Courses CRUD Module', function() {

var Course = function() {
        
        var coursename = element(by.id('coursename'));
        this.setcoursename = function(coursenameText) { coursename.clear(); coursename.sendKeys(coursenameText); };
        

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

it('Should add a new Course', function() {

    var course = new Course();

    // Get courses URL
    course.get();

    // Goto the new menu
    element(by.linkText('Courses')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        course.setcoursename("Your Title text here");

    //Expectations
    course.toast("Course saved successfully");

  });

it('Should  edit a Course', function() {

    var course = new Course();

    course.get();

    //Goto the edit menu
    element(by.linkText('Courses')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        course.setcoursename("Your Updated Title text here");

    //Expectations
    course.toast("Update was a success");



});

it('Should  delete a Course', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Courses')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Course deleted successfully")

      });

  });
});

  });
