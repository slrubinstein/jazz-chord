'use strict';

angular.module('jazzChordApp')
  .directive('keyPressListener', keyPressListener)

keyPressListener.$inject = ['$document', 'current', 'song'];

function keyPressListener($document, current, song) {
  return function(scope, element, attr) {
		$document.on('keydown', keypress);
		scope.$on('$destroy',function(){
		  $document.off('keydown', keypress);
		});

		function keypress(event) {
			if (!current.beat || !current.measure) {
				return;
			}

			if (event.keyCode === 37) {
				prevBeat();
			} else if (event.keyCode === 39) {
				nextBeat();
			}
		}

		function nextBeat() {
			if (current.measure.index() === song.song.length - 1 &&
					current.beat.index() === current.measure.children().length - 1) {
				return;
			}

			if (current.beat.index() === current.measure.children().length - 1) {
				current.measure = $(current.measure.parent().children()[current.measure.index() + 1]);
				current.beat = $(current.measure.find('[select-beat]')[0]);
				current.beat.trigger('click');
			} else {
				$('.select-beat').parent().next().children().trigger('click');
			}
		}

		function prevBeat() {
			if (current.measure.index() === 0 &&
					current.beat.index() === 1) {
				return;
			}

			if (current.beat.index() === 1) {
				current.measure = $(current.measure.parent().children()[current.measure.index() - 1]);
				current.beat = $(current.measure.find('[select-beat]').last());
				current.beat.trigger('click');
			} else {
				$('.select-beat').parent().prev().children().trigger('click');
			}
		}
	};
}