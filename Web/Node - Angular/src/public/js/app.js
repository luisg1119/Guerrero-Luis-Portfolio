/**
 * Our root application file.
 */

angular.module('stealie', ['ngRoute', 'ngSanitize', 'ngMaterial', 'ngFileUpload']); // create our application

// configure our routes
angular.module('stealie').config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'html/login/login.html',
            controller: 'LoginController'
        })
        .when('/manageUsers', {
            templateUrl: 'html/appadmin/manage-users.html',
            controller: 'ManageUsersController'
        })
        .otherwise(({redirectTo: '/manageUsers'}));
});

angular.module('stealie').run(function($rootScope, $mdSidenav) {
    $rootScope.showDashboard = false;

    $rootScope.toggleDash = function(){
        $mdSidenav('left').toggle();
    };
});
