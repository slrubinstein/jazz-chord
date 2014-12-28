'use strict';

angular.module('jazzChordApp')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  return {
    deleteFromDB: deleteFromDB,
    getAllStandards: getAllStandards,
    getAllUserSongs: getAllUserSongs,
    loadSong: loadSong,
    saveSong: saveSong
  }

  function deleteFromDB(songData) {
    return $http.delete('/api/songs/' + songData.songId +
                        '/' + songData.userId);
  }

  function getAllStandards() {
    return $http.get('/api/songs/standards');
  }

  function getAllUserSongs(userId) {
    return $http.get('/api/users/' + userId + '/songs');
  }

  function saveSong(songData) {
    return $http.post('/api/songs', songData)
  }

  function loadSong(songId) {
    return $http.get('/api/songs/' + songId);
  }
}