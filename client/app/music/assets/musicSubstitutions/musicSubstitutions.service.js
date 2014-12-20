'use strict';

angular.module('jazzChordApp')
  .factory('musicSubstitutions', musicSubstitutions);

musicSubstitutions.$inject = ['musicNotes', 'musicChords'];

function musicSubstitutions(musicNotes, musicChords) {

  var subTypes = ['M', 'maj6', 'maj7', 'maj9',
                  '7', '9', '7-5', 'vii\u00B07', 
                  '\u266fii\u00B07', '\u266fIV7',
                  'm', 'm6', 'm7', 'm7-5',
                  'iiim7', 'vim7'];

  return {
    getSubs: getSubs
  }

  function getSubs(root) {
    var substitutions = [];
    subTypes.forEach(function(type) {
      var sub = musicChords.buildChord(root, type);
      substitutions.push(sub);
    });
    return substitutions;
  }
  
}
