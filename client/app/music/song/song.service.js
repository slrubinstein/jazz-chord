'use strict';

angular.module('jazzChordApp')
  .factory('song', song)

song.$inject = ['musicChords']

function song(musicChords) {

  var song = [];

  return {
    addMeasure: addMeasure,
    deleteMeasure: deleteMeasure,
    song: song
    }


  function addMeasure(note, type, beats) {
    var type = 'M-triad';
    var measure = [];

    for (var i = 0; i < beats; i++) {
      var beat = musicChords.buildChord(note, type);
      measure.push(beat);
    }
    song.push(measure);
  }

  function deleteMeasure(index) {
    song.splice(index, 1);
  }
}


