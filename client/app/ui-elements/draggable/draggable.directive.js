'use strict';

angular.module('jazzChordApp')
  .directive('draggable', draggable);

function draggable() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
    	element.draggable({
        revert: 'invalid',
        cursor: 'grabbing',
        helper: 'clone',
        zIndex: 10,
        scope: 'chords',
        revertDuration: 200
      });
    }
  };
}