'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice', 'musicNotes',
													'song', 'musicSubstitutions'];

function DashboardCtrl($scope, dataservice, musicNotes, song,
												musicSubstitutions) {

	var vm = this;

	vm.addMeasure = addMeasure;
	vm.beats = 4;
	vm.discardDraft = discardDraft;
	vm.notes = musicNotes.notes;
	vm.playSong = playSong;
	vm.tempo = 120;
	vm.tempoDown = tempoDown;
	vm.tempoUp = tempoUp;
	vm.songTitle = '';
	vm.substitutions = musicSubstitutions.substitutions;
	vm.standards = dataservice.getAllStandards();
	vm.userSongs = dataservice.getAllUserSongs();

	function addMeasure(note, index) {
		song.addMeasure(note, index, vm.beats);
	}

	function discardDraft() {

	}

	function playSong() {

	}

	function tempoDown() {

	}

	function tempoUp() {

	}
}
