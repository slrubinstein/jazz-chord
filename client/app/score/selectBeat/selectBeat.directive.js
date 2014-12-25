'use strict';

angular.module('jazzChordApp')
  .directive('selectBeat', selectBeat)

selectBeat.$inject = ['$document'];

function selectBeat($document) {
  return function(scope, element, attr) {
		element.on('click', function() {
			$('.select-beat').removeClass('select-beat')
			element.addClass('select-beat');
		})
	};
}