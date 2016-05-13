angular.module('app').service('RoutingService', function() {
   var getRoute = function(roleId) {
       var url = '';
       switch (roleId) {
           case 1: // application admin
               url = '/manageUsers';
               break;
           case 2: // staffing coordinator
               url = '/viewSeats';
               break;
           default:
               url = '/notFound';
               break;
       }
       return url;
   };
    return {
        getRoute: getRoute
    };
});
