'use strict';

angular.module('jazzChordApp')
  .directive('droppable', droppable);

function droppable() {
  return {
    restrict: 'A',
    link: link
  };
}

function link(scope, element) {
  element.droppable({
    scope: 'chords',
    drop: function(event, ui) {
    	var root = ui.draggable.text() || 'rest',
  			type = 'M',
        // beatIndex must be -1 to account for delete button
  			beatIndex = $(event.target).parent().index() - 1,
  			measureIndex = $(event.target).closest('.song').index(),
  			ctrl = scope.$parent.$parent.score;

    	ctrl.switchChords(root, type, beatIndex, measureIndex);
      ctrl.substitutions = [];
    	scope.$apply();
    }
  })

}