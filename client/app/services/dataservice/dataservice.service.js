'use strict';

angular.module('jazzChordApp')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  return {
    saveSong: saveSong
  }

  function saveSong() {
    // return $http.put...
  }
}