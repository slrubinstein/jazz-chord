'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice', 'musicNotes',
													'song', 'musicSubstitutions', 'Auth'];

function DashboardCtrl($scope, dataservice, musicNotes, song,
												musicSubstitutions, Auth) {

	var vm = this;

	vm.addMeasure = addMeasure;
	vm.beats = 4;
	vm.discardDraft = discardDraft;
	vm.notes = musicNotes.notes;
	vm.playSong = playSong;
	vm.saveSong = saveSong;
	vm.songTitle = '';
	vm.substitutions = musicSubstitutions.substitutions;
	vm.standards = dataservice.getAllStandards();
	vm.tempo = 120;
	vm.tempoDown = tempoDown;
	vm.tempoUp = tempoUp;
	vm.user = Auth.getCurrentUser();
	vm.userSongs = [];

	activate();

	function activate() {
		vm.userSongs = getAllUserSongs();
		// getAllStandards();
	}

	function addMeasure(note, index) {
		song.addMeasure(note, index, vm.beats);
	}

	function discardDraft() {

	}

	function getAllUserSongs() {
		dataservice.getAllUserSongs()
		.then(function(songs) {
			console.log(songs.data)
			vm.userSongs = songs.data;
		});
	}

	function playSong() {

	}

	function saveSong() {
		dataservice.saveSong({
			title: vm.songTitle,
			beatsPerMeasure: vm.beats,
			tempo: vm.tempo,
			song: song.song
		})
		.then(function() {
			console.log('song saved')
			getAllUserSongs();
		})
	}

	function tempoDown() {

	}

	function tempoUp() {

	}
}
