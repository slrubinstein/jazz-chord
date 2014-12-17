'use strict';

angular.module('jazzChordApp')
  .factory('musicChords', musicChords);

musicChords.$inject = ['musicNotes'];

function musicChords(musicNotes) {

  var musicNotes = musicNotes.notes;

  return {
    buildMajorChord: buildMajorChord
  }

  function buildMajorChord(root, type) {
    var chord = {
      root: root,
      type: type,
      intervals: [0, 4, 7]
    };
    chord.notes = getChordNotes(root, chord.intervals)

    function getChordNotes(root, intervals) {
      var notes = intervals.map(function(i) {
        return musicNotes[ musicNotes.indexOf(root) + i ];
      })
      return notes;
    }
    return chord;
  }



}