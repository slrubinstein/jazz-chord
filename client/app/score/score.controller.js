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
		vm.substitutions = musicSubstitutions.getSubs(root);
	}

	function switchChords(root, type, beatIndex, measureIndex) {
		var newBeat = musicChords.buildChord(root, type);
		vm.song[measureIndex].splice(beatIndex, 1, newBeat);
		player.playOne(newBeat);
	}

	$scope.$on('updateSong', function(event, loadedSong) {
		song.song.length = 0;
		loadedSong.forEach(function(measure) {
			song.song.push(measure)
		})
	})
}
