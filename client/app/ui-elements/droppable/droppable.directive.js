'use strict';

angular.module('jazzChordApp')
  .directive('droppable', droppable);

function droppable() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      element.droppable({
        scope: 'chords',
        drop: function(event, ui) {
        	var root = ui.draggable.text(),
        			type = 'M-triad',
        			beatIndex = $(event.target).parent().index(),
        			measureIndex = $(event.target).closest('.measure').index(),
        			ctrl = scope.$parent.$parent.score;

        	ctrl.switchChords(root, type, beatIndex, measureIndex);
        	scope.$apply();
        }
      })
    }
  };
}