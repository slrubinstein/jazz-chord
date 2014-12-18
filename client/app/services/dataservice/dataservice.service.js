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
    return $http.get('/api/songs');
  }

  function saveSong(songData) {
    return $http.post('/api/songs', songData);
  }

  function loadMySong(songId) {
    return $http.get('/api/songs/' + songId);
  }

  function loadStandard() {
    // return $http.put...
  }
}