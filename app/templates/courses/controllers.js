angular.module('myApp.services').factory('Course', function($resource) {
  return $resource('api/v1/courses/:id.json', { id:'@courses.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('CourseListController', function($scope, $state,  Course, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Course.get(function(data) {
                     $scope.courses = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.course = value.attributes;
                                                       this.course['id'] = value.id;
                                                       this.push(this.course);                    
                                                        },   $scope.courses); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteCourse = function(selected_id) { 
      course = Course.get({ id: selected_id});
      course.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Course deleted successfully",
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
  
}).controller('CourseEditController', function($scope, $state, $stateParams, toaster, $window, Course) {
     $scope.loading = false;
     $scope.updateCourse = function() { 
     
     $scope.loading = true;
    $scope.course.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('courses.list');
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

  
  $scope.loadCourse = function() { 
                       $scope.course = Course.get({ id: $stateParams.id },
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

  $scope.loadCourse();  
  }).controller('CourseCreateController', function($scope, $state, Course, toaster) {
          $scope.course = new Course(); 
          $scope.loading = false;

         $scope.addCourse = function() { 
                                $scope.loading = true;
                                $scope.course.data.type = "courses";
                                $scope.course.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Course saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('courses.list');
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




  