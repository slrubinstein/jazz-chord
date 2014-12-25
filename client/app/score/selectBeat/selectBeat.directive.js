'use strict';

angular.module('jazzChordApp')
  .directive('selectBeat', selectBeat)

function selectBeat() {
  return function(scope, element, attr) {
		element.on('click', function() {
			$('.select-beat').removeClass('select-beat')
			element.addClass('select-beat');
		})
	};
}