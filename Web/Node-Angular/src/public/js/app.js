/**
 * Our root application file.
 */

angular.module('app', ['ngRoute', 'ngSanitize', 'ngMaterial', 'ngFileUpload']); // create our application

// configure our routes
angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'html/login/login.html',
            controller: 'LoginController'
        })
        .when('/profile', {
            templateUrl: 'html/profile/profile.html',
            controller: 'ProfileController',
            access: {
                loginRequired: true
            }
        })
        // .when('/manageUsers', {
        //     templateUrl: 'html/appadmin/manage-users.html',
        //     controller: 'ManageUsersController',
        //     access: {
        //         loginRequired: true,
        //         requiredRoleId: 1
        //     }
        // })
        // .when('/viewSeats', {
        //     templateUrl: 'html/staffing/view-seats.html',
        //     controller: 'ViewSeatsController'
        // })
        // .when('/uploadSeats', {
        //     templateUrl: 'html/staffing/upload-seats.html',
        //     controller: 'UploadSeatsController'
        // })
        // .when('/forbidden', {
        //     templateUrl: 'html/error/forbidden.html',
        //     controller: 'ForbiddenController'
        // })
        // .when('/notFound', {
        //     templateUrl: 'html/error/not-found.html',
        //     controller: 'NotFoundController'
        // })
        .otherwise(({redirectTo: '/profile'}));
});

angular.module('app').run(function($rootScope, $mdSidenav, AuthenticationService, $window, $location) {

    $rootScope.toggleDash = function(){
        $mdSidenav('left').toggle();
    };

    // $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    //     AuthenticationService.refresh(); // used in case of a refresh in browser
    //     if (nextRoute !== null && nextRoute.access && nextRoute.access.loginRequired) {
    //         if (!AuthenticationService.isLogged() && !$window.sessionStorage.token) {
    //             $location.path('/login');
    //         } else if ($window.sessionStorage.token && nextRoute.access.requiredRoleId) {
    //             if (!AuthenticationService.hasRole(nextRoute.access.requiredRoleId)) {
    //                 $location.path('/forbidden');
    //             }
    //         }
    //     }
    // });
});
