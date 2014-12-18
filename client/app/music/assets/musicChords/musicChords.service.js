'use strict';

angular.module('jazzChordApp')
  .factory('musicChords', musicChords)



musicChords.$inject = ['musicNotes'];

function musicChords(musicNotes) {

  var musicNotes = musicNotes.notes;

  return {
    buildChord: buildChord,
    getIntervals: getIntervals
  }

  function buildChord(root, type) {
    var chord = {};
    chord.root = root;
    chord.type = type;
    chord.intervals = getIntervals(type);
    chord.notes = getChordNotes(root, chord.intervals);

    return chord;
  }

  function getChordNotes(root, intervals) {
    var notes = intervals.map(function(i) {
      return musicNotes[ musicNotes.indexOf(root) + i ];
    })
    return notes;
  }

  function getIntervals(type) {
    switch(type) {
      case 'M-triad':
        return [0, 4, 7];
        break;
      case 'maj6':
        return [0, 4, 7, 9];
        break;
      case 'maj7':
        return [0, 4, 7, 11];
        break;
      case 'maj9':
        return [0, 4, 7, 11, 14];
        break;
    }
  }
}