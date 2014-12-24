'use strict';

angular.module('jazzChordApp')
	.value('current', {beat: null,
										 measure: null})
  .controller('ScoreCtrl', ScoreCtrl);

ScoreCtrl.$inject = ['$scope', 'song', 'musicSubstitutions',
											'musicChords', 'player', 'current'];

function ScoreCtrl($scope, song, musicSubstitutions, musicChords,
									 player, current) {

	var vm = this;

	vm.deleteMeasure = deleteMeasure;
	vm.makeSubs = makeSubs;
	vm.song = song.song;
	vm.substitutions = [];
	vm.switchChords = switchChords;

	
	function deleteMeasure(index) {
		song.deleteMeasure(index);
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

	function switchChords(root, type) {

		var beatIndex = current.beat.index() - 1;
		var measureIndex = current.measure.index();
		// should move to a directive
		if (measureIndex === undefined) {
			measureIndex = $(event.target).closest('.song').index();
		}

		var newBeat = musicChords.buildChord(root, type);
		song.song[measureIndex].splice(beatIndex, 1, newBeat);
		player.playOne(newBeat);
	}
}
