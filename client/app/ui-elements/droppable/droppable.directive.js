'use strict';

angular.module('jazzChordApp')
  .directive('droppable', droppable);

function droppable() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.droppable({
        // accept: '.draggable',
        scope: 'chords',

        drop: function(event, ui) {
        	console.log('dropped')

        }
      })
    }
  };
}