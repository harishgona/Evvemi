angular.module('myApp', ['ui.router', 'ngResource',  'datatables' , 'myApp.controllers', 'myApp.services',
                         'satellizer','toaster', 'ngAnimate', 'angular-google-analytics',
                              'datatables.bootstrap']);

angular.module('myApp')
  .run( function($rootScope, $state){
                $rootScope.$state = $state;
                $rootScope.$state.current.title = "Evvemi";
                }
    );

angular.module('myApp').config(function( $stateProvider , $urlRouterProvider, AnalyticsProvider) {

    

  
$urlRouterProvider.otherwise('/students')



$stateProvider.state('courses', {
        abstract: true, 
        url: '/courses',
        title: 'Courses',
        template: '<ui-view/>'
   })
  .state('courses.list', {
    url: '/list',
    templateUrl: 'courses/index.html',
    controller: 'CourseListController',


  }).state('courses.new', {
    url: '/new',
    templateUrl: '/courses/add.html',
    controller: 'CourseCreateController',

    }).state('courses.edit', {
    url: '/:id/edit',
    templateUrl: 'courses/update.html',
    controller: 'CourseEditController',

        })

   .state('students', {
        abstract: true, 
        url: '/students',
        title: 'Students',
        template: '<ui-view/>'
   })
  .state('students.list', {
    url: '/list',
    templateUrl: 'students/index.html',
    controller: 'StudentListController',


  }).state('students.new', {
    url: '/new',
    templateUrl: '/students/add.html',
    controller: 'StudentCreateController',

    }).state('students.edit', {
    url: '/:id/edit',
    templateUrl: 'students/update.html',
    controller: 'StudentEditController',

        })
   


  ;

  });


angular.module('myApp.services', []);
angular.module('myApp.controllers', []);


