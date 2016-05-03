/**
  Loading.js

  module used to allow control over when code is executed in relation to
  http requests sent out for data retrieval
*/
// init the factory
angular.module('stealie').factory('Loading', ['$q', '$rootScope',
  function ($q, $rootScope) {
    // how many httop requests have been sent out with no returned response
      var loadingCount = 0;

      // our outward facing interface
      return {
        // an http request was sent out
          request: function (config) {
            // first request was sent out, broadcast that a load is in progress
              if(++loadingCount === 1) $rootScope.$broadcast('loading:progress');
              return config || $q.when(config);
          },

          // an http response was returned
          response: function (response) {
            // if there are no more pending responses, broadcast that the loading is finished
              if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
              return response || $q.when(response);
          },

          // an error occurred with the httpresponse
          responseError: function (response) {
            // sill broadcast the load is finished, but reject the response
              if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
              return $q.reject(response);
          }
      };
  }
]).config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('Loading');
}]);
