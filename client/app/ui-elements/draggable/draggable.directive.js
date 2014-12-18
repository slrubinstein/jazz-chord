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
        // start: function(event) {
        //   // reset .droppables to be droppable
        //   droppableFactory.droppable();
        //   dragging.drag = true;
        // },
        // stop: function() {
        //   dragging.drag = false;
        // },
        revertDuration: 200
      });
    },
  };
}