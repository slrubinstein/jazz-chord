'use strict';

angular.module('jazzChordApp')
  .controller('ScoreCtrl', ScoreCtrl);

ScoreCtrl.$inject = ['$scope', 'song', 'musicSubstitutions',
											'musicChords', 'player'];

function ScoreCtrl($scope, song, musicSubstitutions, musicChords,
									 player) {

	var vm = this;

	vm.deleteMeasure = deleteMeasure;
	vm.makeSubs = makeSubs;
	vm.song = song.song;
	vm.substitutions = [];
	vm.switchChords = switchChords;

	
	function deleteMeasure(index) {
		song.deleteMeasure(index);
	}

	function makeSubs(root) {
		if (root === '/') {
			vm.substitutions = [];
			return;
		}
		vm.substitutions = musicSubstitutions.getSubs(root);
	}

	function switchChords(root, type, beatIndex, measureIndex) {

		// should move to a directive
		if (measureIndex === undefined) {
			measureIndex = $(event.target).closest('.song').index();
		}

		var newBeat = musicChords.buildChord(root, type);
		song.song[measureIndex].splice(beatIndex, 1, newBeat);
		player.playOne(newBeat);
	}
}
