'use strict';

angular.module('jazzChordApp')
  .factory('song', song)

function song() {

  var song = ['a'];

  return {
    addMeasure: addMeasure,
    deleteMeasure: deleteMeasure,
    song: song
    }


  function addMeasure(note, index) {
    var measure = {};
    console.log(note, index)
    song.push(measure);
  }

  function deleteMeasure(index) {
    song.splice(index, 1);
  }
}


