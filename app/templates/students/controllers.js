angular.module('myApp.services').factory('Student', function($resource) {
  return $resource('api/v1/students/:id.json', { id:'@students.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('StudentListController', function($scope, $state,  Student,toaster) {
          
        Student.get(function(data) {
                     $scope.students = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.student = value.attributes;
                                                       this.student['id'] = value.id;
                                                       this.push(this.student);                    
                                                        },   $scope.students); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteStudent = function(selected_id) { // Delete a Student. Issues a DELETE to /api/students/:id
      student = Student.get({ id: selected_id});
      student.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Student deleted successfully",
                showCloseButton: true,
                timeout: 0
                });
      
        $state.reload();
      }, function(error) {
         toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });;
    });
    };
  
}).controller('StudentEditController', function($scope, $state, $stateParams, toaster, Student) {
     $scope.loading = false;
     $scope.updateStudent = function() { //Update the student. Issues a PATCH to /v1/api/students/:id
     
     $scope.loading = true;
    $scope.student.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('students.list');
       $scope.loading = false;
      //$state.go('sites'); // on success go back to home i.e. sites state.
    }, function(error) {
    toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });
      $scope.loading = false;
    });
  };

  
  $scope.loadStudent = function() { //Issues a GET request to /api/students/:id to get a student to update
                       $scope.student = Student.get({ id: $stateParams.id },
                                       function() {}, function(error) {
                                          toaster.pop({
                                                type: 'error',
                                                title: 'Error',
                                                body: error,
                                                showCloseButton: true,
                                                timeout: 0
                                                });
                                                });
                                };

  $scope.loadStudent(); // Load a student 
  }).controller('StudentCreateController', function($scope, $state, Student, toaster) {
          $scope.student = new Student(); 
          $scope.loading = false;

         $scope.addStudent = function() { //Issues a POST to v1/api/student.json
                                $scope.loading = true;
                                $scope.student.data.type = "students";
                                $scope.student.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Student saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('students.list');
                                   $scope.loading = false; 
                                }, function(error) {
                                toaster.pop({
                                            type: 'error',
                                            title: 'Error',
                                            body: error,
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                 $scope.loading = false;
                                           });
                                 };
});




  