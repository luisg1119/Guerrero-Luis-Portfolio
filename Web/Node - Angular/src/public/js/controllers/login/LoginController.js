/**
  LoginController.js

  Controller file for the login page
*/

angular.module('stealie').controller('LoginController', function(
  $rootScope, $scope, $http, $sanitize, $location
){
    /**
     * function for sending user information to the authentication server
     * if the user enters invalid credentials, they will be notified. Otherwise, they will check
     * to see if the user is registered with the app
     */
    $scope.authenticate = function() {
      // post request to our ldap auth endpoint
      $http({
        url: '/api/ldap',
        method: 'POST',
        data: {
          // user $sanitize to help prevent against injections
          email: $sanitize($scope.user.email),
          password: $sanitize($scope.user.password)
        }
      }).then(
          function(response) { // success
            // now verify that they are registered with the app
            $http({
              url: '/api/users/' + $sanitize($scope.user.email),
              method: 'GET'
            }).then(
                function(response) { // success
                  $rootScope.userSession = $scope.user; // set the user session
                  $location.path('/home'); // navigate the user to home
                }, function(response) { //  failure
                  // let the user know that they are not registed with the application
                  $scope.errorMessage = 'You are not registered. Please contact the application administrator';
                }
            );
          },
          function(response) { // failure
            // let the user know that the credentials were invalid
            $scope.errorMessage = 'Invalid user email or password';
          }
      );
    };

    $rootScope.showDashboard = false;// hide the topbar on the login screen
    // our user login object
    $scope.user = {
      email: null,
      password: null
    };
});
