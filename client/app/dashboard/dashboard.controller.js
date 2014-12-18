'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice', 'musicNotes',
													'song', 'musicSubstitutions', 'Auth'];

function DashboardCtrl($scope, dataservice, musicNotes, song,
												musicSubstitutions, Auth) {

	var vm = this;

	vm.addMeasure = addMeasure;
	vm.beats = song.beats;
	vm.discardDraft = discardDraft;
	vm.loadMySong = loadMySong;
	vm.mySong = '';
	vm.notes = musicNotes.notes;
	vm.playSong = playSong;
	vm.saveSong = saveSong;
	vm.songTitle = '';
	vm.substitutions = musicSubstitutions.substitutions;
	vm.standards = dataservice.getAllStandards();
	vm.tempo = song.tempo;
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
			vm.userSongs = songs.data;
		});
	}

	function loadMySong() {
		dataservice.loadMySong(vm.mySong._id)
		.then(function(loadedSong) {
			console.log(loadedSong.data.song)
			if (loadedSong.data.song.length === 0) {
				return;
			};
			song.song = loadedSong.data.song;

			$scope.$broadcast('updateSong')
		});
	}

	function playSong() {

	}

	function saveSong() {
		dataservice.saveSong({
			title: vm.songTitle,
			beatsPerMeasure: vm.beats,
			tempo: vm.tempo,
			author: vm.user._id || '',
			song: song.song
		})
		.then(function() {
			getAllUserSongs();
		})
	}

	function tempoDown() {

	}

	function tempoUp() {

	}
}
