/**
  Bluepages.js

  service for querying bluepages, and extracting the relevant data
*/
  /**
    $http - used to pull bluepages information
  */
  angular.module('stealie').service('Bluepages', function($http) {
    /**
     * Extract user information from bluepages json
     * @param data the json returned from the bluepages call
     */
    var extract = function(data) {
      // if the email was invalid, then there will be no entries
      if (data.search.entry.length === 0) {
        return null;
      }
      // get the attribute, where all of hte data is located
      var bpArray = data.search.entry[0].attribute;
      var returnObject = {}; // init our return object
      // look through every attribute
      for ( var i = 0; i < (Object.keys(bpArray).length - 1); i++) {
        switch (bpArray[i].name) {
          // Employee name
          case 'cn':
            name = bpArray[i].value[0];
            returnObject.name = bpNameFix(name);
            break;
          // Serial number
          case 'ibmserialnumber':
            returnObject.serial = bpArray[i].value[0];
            break;
          // Employee country code
          case 'co':
            returnObject.country = bpArray[i].value[0];
            break;
          // Employee emails
          case 'mail':
            returnObject.email = bpArray[i].value[0];
            break;
          // we don't care about any other attributes
          default:
            break;
        }
      }
      return returnObject;
    };

    var bpNameFix = function(name){
        name = name.toLowerCase();
        nameArray = name.split(' ');
        temp = '';
        for(j = 0; j<nameArray.length;j++){
            temp += nameArray[j].charAt(0).toUpperCase() + nameArray[j].slice(1) + " ";
        }
        return temp.trim();
    };

    // outward facing interface
    return {
      extract: extract
    };
  });
