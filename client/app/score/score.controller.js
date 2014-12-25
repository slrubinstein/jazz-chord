'use strict';

angular.module('jazzChordApp')
	.value('current', {beat: null,
										 measure: null})
  .controller('ScoreCtrl', ScoreCtrl)

  .directive('selectBeat', function($document) {
  	return function(scope, element, attr) {
			element.on('click', function() {
  			$('.select-beat').removeClass('select-beat')
  			element.addClass('select-beat');
  		})
  	}
  })



  ;

ScoreCtrl.$inject = ['$scope', 'song', 'musicSubstitutions',
											'musicChords', 'player', 'current'];

function ScoreCtrl($scope, song, musicSubstitutions, musicChords,
									 player, current) {

	var vm = this;

	vm.deleteMeasure = deleteMeasure;
	vm.keypress = keypress;
	vm.makeSubs = makeSubs;
	vm.song = song.song;
	vm.substitutions = [];
	vm.switchChords = switchChords;

	var $doc = angular.element(document);

	$doc.on('keydown', keypress);
	$scope.$on('$destroy',function(){
	  $doc.off('keydown', keypress);
	})
	
	function deleteMeasure(index) {
		song.deleteMeasure(index);
		current.beat = null;
		current.measure = null;
		vm.substitutions = [];
	}

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
			console.log('end of song')
			return;
		}

		if (current.beat.index() === current.measure.children().length - 1) {
			current.measure = $(current.measure.parent().children()[current.measure.index() + 1])
			current.beat = $(current.measure.find('[select-beat]')[0])
			current.beat.trigger('click')
		} else {
			$('.select-beat').parent().next().children().trigger('click');
		}
	}

	function prevBeat() {
		if (current.measure.index() === 0 &&
				current.beat.index() === 1) {
			console.log('beginning of song')
			return;
		}

		if (current.beat.index() === 1) {
			current.measure = $(current.measure.parent().children()[current.measure.index() - 1])
			current.beat = $(current.measure.find('[select-beat]').last())
			current.beat.trigger('click')
		} else {
			$('.select-beat').parent().prev().children().trigger('click');
		}
	}

	function makeSubs(event, root) {
		current.beat = $(event.target).parent();
		current.measure = $(event.target).parent().parent();

		if (root === '/') {
			vm.substitutions = [];
			return;
		}
		vm.substitutions = musicSubstitutions.getSubs(root);
	}

	function switchChords(root, type, beatIndex, measureIndex) {

		if (beatIndex === undefined) {
			beatIndex = current.beat.index() - 1;
		}
		if (measureIndex === undefined) {
			measureIndex = current.measure.index();
		}

		var newBeat = musicChords.buildChord(root, type);
		song.song[measureIndex].splice(beatIndex, 1, newBeat);
		player.playOne(newBeat);
	}
}
