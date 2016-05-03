/**
  ViewUserController.js

  controller for handling view user modal
*/
angular.module('stealie').controller('ViewUserController', function(
  $scope, $rootScope, $http, $mdDialog, Bluepages, user
) {
    /**
    Cancels out of the modal
    */
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.view = {}; // holds our view related variables
    $scope.view.errorMessage = null; // no initial error message
    $scope.user = user; // store the user object passed in to view


    $rootScope.$on('loading:progress', function (){
        $scope.view.modalLoading = true; // show the loading spinner
    });

    // all response have been returned
    $rootScope.$on('loading:finish', function (){
        $scope.view.modalLoading = false;// hide the loading spinner
    });
});
