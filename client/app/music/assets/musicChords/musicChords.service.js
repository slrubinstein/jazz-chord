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
    if (root === 'rest') {
      var chord = {root: '/'};
    } else {
      var chord = {};
      chord.root = root;
      chord.type = type;
      chord.intervals = getIntervals(type);
      chord.notes = getChordNotes(root, chord.intervals);
      chord.frequencies = getFrequencies(root, chord.intervals);
      chord.altRoot = getAltRoot(chord.root, chord.type);
    }

    return chord;
  }

  // for chords with a different root note
  function getAltRoot(root, type) {
    switch (type) {
      case'm7 (iii)':
        return noteNames[ noteNames.indexOf(root ) + 4];
        break;
      case 'm7 (vi)':
        return noteNames[ noteNames.indexOf(root) + 9];
        break;
      case '7 (vii\u00B0)':
        return noteNames[ noteNames.indexOf(root) + 11];
        break;
      case '7 (\u266fii\u00B0)':
        return noteNames[ noteNames.indexOf(root) + 3];
        break;
      case '7 (IV\u266f)':
        return noteNames[ noteNames.indexOf(root) + 6]; 
        break;
      default:
        return null;
    }
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
      // major substitutions
      case 'M':
        return [0, 4, 7];
        break;
      case 'maj6':
        return [0, 4, 7, 9];
        break;
      case 'maj7':
        return [0, 4, 7, 11];
        break;
      case 'maj9':
        return [0, 4, 7, 11, 2];
        break;
      // dominant 7 substitutions
      case '7':
        return [0, 4, 7, 10];
        break;
      case '9':
        return [0, 4, 7, 10, 2];
        break;
      case '7-5':
        return [0, 4, 6, 10];
        break;
      case '7 (vii\u00B0)':
        return [11, 2, 5, 8];
        break;
      case '7 (\u266fii\u00B0)':
        return [3, 6, 9, 12];
        break;
      case '7 (IV\u266f)':
        return [6, 10, 13, 4];
        break;
      // minor substitutions
      case 'm':
        return [0, 3, 7];
        break;
      case 'm6':
        return [0, 3, 7, 9];
        break;
      case 'm7':
        return [0, 3, 7, 10];
        break;
      case 'm7-5':
        return [0, 3, 6, 10];
        break;
      // tonic substitutions
      case 'm7 (iii)':
        return [4, 7, 11, 2];
        break;
      case 'm7 (vi)':
        return [9, 0, 4, 7];
        break;
    }
  }
}