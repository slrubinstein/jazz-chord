'use strict';

angular.module('jazzChordApp')
  .factory('musicSubstitutions', musicSubstitutions);

musicSubstitutions.$inject = ['musicNotes', 'musicChords'];

function musicSubstitutions(musicNotes, musicChords) {

  var subTypes = ['M', 'maj6', 'maj7', 'maj9',
                  '7', '9', '7-5', '7 (vii\u00B0)', 
                  '7 (\u266fii\u00B0)', '7 (IV\u266f)',
                  'm', 'm6', 'm7', 'm7-5',
                  'm7 (iii)', 'm7 (vi)'];

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
