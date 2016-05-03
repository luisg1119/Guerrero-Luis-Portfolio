angular.module('stealie').controller('ManageUsersController', function(
    $rootScope, $scope, $mdSidenav, $mdDialog, $http
) {
    /**
     * Handler to view the details of the user
     * @param userToView user object pulled from the view
     */
    $scope.viewUser = function(userToView) {
        clearMessages(); // clear our error and success messages
        $scope.view.modalOpen = true; // we now have a modal open
        $mdDialog.show({
            controller: 'ViewUserController',
            templateUrl: 'html/appadmin/view-profile.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {user : userToView}
            })
            .then(
                // we don't really want to handle anything, but including for reference
                function(success) {},
                function() {}
            )
            .finally(function() { // modal is no longer open
                $scope.view.modalOpen = false;
            });
    };

    /**
     * Handler to delete a user from the db
     * @param userToDelete the user object pulled from the view
     */
    $scope.deleteUser = function(userToDelete) {
        clearMessages(); // clear our error and success messages
        $scope.view.modalOpen = true; // we now have a modal open
        $mdDialog.show({
            controller: 'DeleteUserController',
            templateUrl: '/html/appadmin/delete-user.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {user : userToDelete}
            })
            .then(
                function(success) {  // attempted to delete user from db
                    if(success) { // success
                        $scope.view.successMessage = 'User successfully deleted';
                    } else { // error
                        $scope.view.errorMessage = 'Failed to delete user.';
                    }
                    getUsers(); // show the updated list of users
                }, function() {  //failure
                    $scope.view.errorMessage = 'Delete user operation canceled';
                }
            )
            .finally(function() { // modal is no longer open
                $scope.view.modalOpen = false;
            });
    };

    /**
     * Handler for editing user admin privs
     * @param userToEdit the user object pulled from the view
     */
    $scope.editUser = function(userToEdit) {
        clearMessages(); // clear our error and success messages
        $scope.view.modalOpen = true; // we now have a modal open
        $mdDialog.show({
            controller: 'EditUserController',
            templateUrl: '/html/appadmin/edit-user.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {user : userToEdit,
                     userRoles : $scope.userRoles}
            })
            .then(
                function(success) { // user attempted to update
                    if(success) { // success
                        $scope.view.successMessage = 'User information successfully updated';
                    } else { // error
                        $scope.view.errorMessage = 'Failed to edit user information';
                    }
                    getUsers(); // upate the user list
                }, function() { // cancel
                    $scope.view.errorMessage = 'Edit user operation canceled';
                }
            )
            .finally(function() { // modal is no longer open
                $scope.view.modalOpen = false;
            });
    };

    /**
     * Gets the users from the db
     */
    var getUsers = function() {
        $http.get('/api/v1/users')
            .then(
                function(response) { // success function handler
                    $scope.users = response.data;
                    $scope.users.forEach(function(user) {
                        user.roles = []; // init our list of roles
                        $http.get('/api/v1/users/' + user.str_guid + '/system_roles')
                            .then(
                                function(response) {
                                    response.data.forEach(function(role) {
                                        user.roles.push(role.str_role_name);
                                    });// response.data.forEach
                                }, function(response) { // error getting resource_roles links
                                    $scope.view.errorMessage = 'Could not retrieve user roles';
                                }
                            );// $http.get for resource/roles
                    }); // users.forEach
                }, function(response) { // error for retrieving users
                    $scope.view.errorMessage = 'Could not retrieve user list';
                }
            ); // $http.get for users
    };

    /**
     * Gets all roles from the db. Useful for filtering
     */
    var getRoles = function() {
        $http.get('/api/v1/system_roles').then(
            function(response) { // success
                $scope.userRoles = response.data;
            }, function(response) { // error
                $scope.view.errorMessage = 'Could not retrieve user roles';
            }
        );
    };

    /**
     * Clears the success and error messages in the view
     */
    var clearMessages = function() {
        $scope.view.successMessage = null;
        $scope.view.errorMessage = null;
    };

    $scope.data = {}; // our data object
    $scope.view = {}; // our view related variables

    $scope.view.modalOpen = false; // whether or not a modal is open, used to prevent parent contain from also displaying loading spinner

    $rootScope.showDashboard = true; // do we show the user dashboard, which is a global


    // waiting for all http responses
    $rootScope.$on('loading:progress', function (){
        $scope.view.loading = true; // show the loading spinner
    });

    // all response have been returned
    $rootScope.$on('loading:finish', function (){
        $scope.view.loading = false; // hide the loading spinner
    });

    getUsers(); // load the data initially
    getRoles(); // load all the roles from the db
});
