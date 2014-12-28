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
		current.beat = null;
		current.measure = null;
		vm.substitutions = [];
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
		if (player.playerOn) {
			player.playOne(newBeat);
		}
	}
}
