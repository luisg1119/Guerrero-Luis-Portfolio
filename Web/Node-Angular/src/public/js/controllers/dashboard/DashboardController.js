angular.module('app').controller('DashboardController', function(
    $scope, $rootScope, $location, AuthenticationService /*, RoutingService*/
) {
    $scope.logout = function() {
        AuthenticationService.logout();
        $rootScope.toggleDash();
        $location.path('/login');
    };
    
    // $scope.goto = function(roleId) {
    //     $location.path(RoutingService.getRoute(roleId));
    // };

    $scope.user = AuthenticationService.getUser();
});