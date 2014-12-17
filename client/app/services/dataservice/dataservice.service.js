'use strict';

angular.module('jazzChordApp')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  return {
    getAllStandards: getAllStandards,
    getAllUserSongs: getAllUserSongs,
    loadMySong: loadMySong,
    loadStandard: loadStandard,
    saveSong: saveSong
  }

  function getAllStandards() {

  }

  function getAllUserSongs() {

  }

  function saveSong() {
    // return $http.put...
  }

  function loadMySong() {
    // return $http.put...
  }

  function loadStandard() {
    // return $http.put...
  }
}