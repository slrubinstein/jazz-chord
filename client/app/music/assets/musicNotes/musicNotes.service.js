'use strict';

angular.module('jazzChordApp')
  .factory('musicNotes', musicNotes);


function musicNotes() {

	var notesData = [];

	var letters = ['A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d']

	for (var n = -48, i = 0; n < 40; n++, i++) {
	  var note = {};
	  var o = Math.floor(i/12);
	  var frequency = 440 * Math.pow(2, (n/12))
	  var j = i % 12
	  var letter = letters[j]
	  note.keyId = i;
	  note.octave = o;
	  note.noteName = letter;
	  note.frequency = frequency;
	  notesData.push(note);
	}

  var noteNames = notesData.slice(0, 36).map(function(note) {
  	return note.noteName;
  });
  return {
    noteNames: noteNames,
    notesData: notesData
  }
  
}