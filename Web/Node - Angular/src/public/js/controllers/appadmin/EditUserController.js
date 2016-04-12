/**
  EditUserController.js

  Controller for handling changing admin status of a user
*/
angular.module('stealie').controller('EditUserController', function(
  $scope, $rootScope, $mdDialog, $http, user, userRoles, Bluepages
) {
  /**
    Updates the user admin status in the db
    TODO: Update the ID of the put from the email to GUID probably
  */
  $scope.update = function() {
  var data = []; // our data -- ids for roles
  // move the ids from object notation to an array
  for (var key in $scope.userRoles) {
      data.push($scope.userRoles[key].int_role_id);
  }
  $http.delete('/api/v1/users/' + user.str_guid + '/system_roles')
    .then(function(response) {
        // associate the roles with the user
        $http.post('/api/v1/users/' + user.str_guid + '/system_roles', {userRoles: data})
            .then(
                function(response) { // succes
                    $mdDialog.hide(true);
                }, function(response) { // failure
                    $mdDialog.hide(false);
                }
            );
    }, function(response) {
        $mdDialog.hide(false);
    });
  };

  /**
    Cancels out of the modal
  */
  $scope.cancel = function() {
    // Use this instead of dismiss to prevent error if admin status is changed
    // but the close button is pressed instead of update
    // otherwise, the view will update (even though the db has not)
    $mdDialog.cancel();
  };

  /**
   * Tests whether or not an element exists in a list
   * @param item the item to look for
   * @param list the list to check
   * @returns {boolean} whether or not the item was found in the list
   */
  $scope.exists = function(item, list) {
      return list.indexOf(item) > -1;
  };

  /**
   * Toggles a checkbox to either set or unset
   * @param item the value to be checked
   * @param list the list of elements to be checked against
   */
  $scope.toggle = function(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
          list.splice(idx, 1);
      } else {
          list.push(item);
      }
  };

  /**
   * Gets the users currently set roles
   * @param currRoles the users current roles
   * @param roles the roles in the interface
   */
  var getCurrRoles = function(currRoles, roles) {
      for(var i = 0; i < currRoles.length; i++) {
          for(var j = 0; j < roles.length; j++) {
              if(roles[j].str_role_name === currRoles[i]){
                  $scope.userRoles.push(roles[j]);
              }
          }
      }
  };

  $scope.view = {}; // holds our view related vars
  $scope.user = user; // the user to be edited

  $scope.roles = userRoles;
  $scope.userRoles = [];
  $scope.view.errorMessage = null;
  $scope.view.foundBluepages = false;
  //
  // waiting for all http responses
  $rootScope.$on('loading:progress', function (){
    $scope.view.loading = true; // show the loading spinner
  });

  // all response have been returned
  $rootScope.$on('loading:finish', function (){
    $scope.view.loading = false; // hide the loading spinner
  });

  getCurrRoles(user.roles, $scope.roles);
});
