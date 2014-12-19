'use strict';

angular.module('jazzChordApp')
  .factory('musicChords', musicChords)



musicChords.$inject = ['musicNotes'];

function musicChords(musicNotes) {

  var noteNames = musicNotes.noteNames;
  var notesData = musicNotes.notesData;

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
    chord.frequencies = getFrequencies(root, chord.intervals);
    return chord;
  }

  function getChordNotes(root, intervals) {
    var chordNotes = intervals.map(function(i) {
      return noteNames[ noteNames.indexOf(root) + i ];
    })
    return chordNotes;
  }

  function getFrequencies(root, intervals) {
    var frequencies = [];

    intervals.forEach(function(i) {
      var thisFreq = notesData [ noteNames.indexOf(root) + i + 48].frequency;
      frequencies.push(thisFreq)
    });
    return frequencies;
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
      case '7':
        return [0, 4, 7, 10];
        break;
      case '9':
        return [0, 4, 7, 10, 14];
        break;
      case '7-5':
        return [0, 4, 6, 10];
        break;
      case 'vii\u00B07':
        return [-1, 2, 5, 8];
        break;
      case '\u266fii\u00B07':
        return [3, 6, 9, 12];
        break;
      case '\u266fIV7':
        return [6, 10, 13, 16];
        break;
    }
  }
}