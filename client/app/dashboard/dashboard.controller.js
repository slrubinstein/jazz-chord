'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice', 'musicNotes',
													'song'];

function DashboardCtrl($scope, dataservice, musicNotes, song) {

	var vm = this;

	vm.addMeasure = addMeasure;
	vm.discardDraft = discardDraft;
	vm.notes = musicNotes.notes;
	vm.playSong = playSong;
	vm.tempo = 120;
	vm.tempoDown = tempoDown;
	vm.tempoUp = tempoUp;
	vm.songTitle = '';
	vm.standards = dataservice.getAllStandards();
	vm.userSongs = dataservice.getAllUserSongs();

	function addMeasure(note, index) {
		song.addMeasure(note, index);
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
