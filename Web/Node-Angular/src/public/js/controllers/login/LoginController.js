/**
  LoginController.js

  Controller file for the login page
*/

angular.module('app').controller('LoginController', function(
  $rootScope, $scope, $http, $sanitize, $location, AuthenticationService
){
    /**
     * function for sending user information to the authentication server
     * if the user enters invalid credentials, they will be notified. Otherwise, they will check
     * to see if the user is registered with the app
     */
    $scope.authenticate = function() {
      // verify that they are registered with the app
      $http.post('/api/login', {email: $sanitize($scope.user.email), password: $sanitize($scope.user.password)})
        .then(
            function(response) { // success
              console.log(response);
              if(response.data.error){
                $scope.errorMessage = 'You have entered a wrong password';
              }
              else{
                AuthenticationService.login(/*response.data.token,*/ response.data.user);
                $location.path("/profile"); // navigate the user to home
              }
            }, function(response) { //  failure
              // let the user know that they are not registed with the application
              $scope.errorMessage = 'You are not registered. Please contact the application administrator';
            }
        );
    };

    $rootScope.showDashboard = false;// hide the topbar on the login screen
});
