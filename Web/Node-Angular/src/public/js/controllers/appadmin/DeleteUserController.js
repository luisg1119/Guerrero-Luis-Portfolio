/**
  DeleteUserController.js

  Controller for handling the delete user modal
*/
angular.module('stealie').controller('DeleteUserController', function(
  $scope, $mdDialog, $rootScope, $http, user
) {
  /**
    deletes the user from the db
  */
  $scope.delete = function() {
    $http.get('/api/v1/users/' + user.str_email)
    .then(function(response) { // success
        var guid = response.data[0].str_guid;
        $http.delete('/api/v1/users/' + guid + '/system_roles')
            .then(function(response) { // success
                $http.delete('/api/v1/users/' + guid)
                .then(function(response) { // success
                  $mdDialog.hide(true); // close to trigger result handler in admin controller
                }, function(response) { // failure
                  $mdDialog.hide(false);
                });
            }, function(response) { // failure
              $mdDialog.hide(false);
            });
      }, function(response) { // failure
      $mdDialog.hide(false);
    });
  };

  /**
    Closes the modal
  */
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.user = user; // used to display user name

  // waiting for all http responses
  $rootScope.$on('loading:progress', function (){
    $scope.loading = true; // show the loading spinner
  });

  // all response have been returned
  $rootScope.$on('loading:finish', function (){
    $scope.loading = false; // hide the loading spinner
  });
});
