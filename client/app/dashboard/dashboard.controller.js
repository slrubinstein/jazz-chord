'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice', 'musicNotes', 'song',
												 'musicSubstitutions', 'Auth', 'User', '$modal',
												 'player'];

function DashboardCtrl($scope, dataservice, musicNotes, song,
												musicSubstitutions, Auth, User, $modal, 
												player) {

	var vm = this;

	vm.addMeasure = addMeasure;
	vm.beats = song.beats;
	vm.beatsDown = beatsDown;
	vm.beatsUp = beatsUp;
	vm.discardDraft = discardDraft;
	vm.getInfo = getInfo;
	vm.loadMySong = loadMySong;
	vm.mySong = '';
	vm.notes = musicNotes.noteNames;
	vm.playSong = playSong;
	vm.saveModal = saveModal;
	vm.songTitle = song.title;
	vm.substitutions = musicSubstitutions.substitutions;
	// vm.standards = dataservice.getAllStandards();
	vm.tempo = song.tempo;
	vm.tempoDown = tempoDown;
	vm.tempoUp = tempoUp;
	vm.user = {};
	vm.userSongs = [];

	activate();

	function activate() {
		Auth.isLoggedInAsync(function(loggedIn) {
			if (loggedIn) {
				vm.user = Auth.getCurrentUser();
				vm.userSongs = getAllUserSongs(vm.user._id);		
			}
		});
		// dataservice.getAllStandards();
	}

	function addMeasure(note) {
		song.addMeasure(note, vm.beats);
	}

	function beatsDown() {
		song.beats -= 1;
		vm.beats = song.beats;
	}

	function beatsUp() {
		song.beats += 1;
		vm.beats = song.beats;
	}

	function discardDraft() {
		var modalInstance = $modal.open({
 			templateUrl: 'discardModal.html',
 			controller: 'ModalCtrl',
 			controllerAs: 'modal',
 			resolve: {
 				songData: function() {
 					var songData = {
 						songTitle: vm.mySong.title,
 						author: vm.user._id,
 						songId: vm.mySong._id
 					};
 					return songData;
 				}
 			}
 		});

 		modalInstance.result.then(function(result) {
 			song.title = '';
 			vm.songTitle = song.title;
 			vm.mySong = '';
 			getAllUserSongs(vm.user._id);
 		});

	}

	function getAllUserSongs(userId) {
		dataservice.getAllUserSongs(userId)
		.then(function(songs) {
			vm.userSongs = songs.data;
		});
	}

	function getInfo() {

		var modalInstance = $modal.open({
 			templateUrl: 'infoModal.html',
 			resolve: {
 				songData: function() {
 					var songData = {
 						songTitle: vm.songTitle,
 						author: vm.user._id
 					};
 					return songData;
 				}
 			},
 			controller: 'ModalCtrl',
 			controllerAs: 'modal',
 		});

	}

	function loadMySong() {
		if (!vm.mySong._id) {
			return;
		}

		dataservice.loadMySong(vm.mySong._id)
		.then(function(loadedSong) {
			if (loadedSong.data.song.length === 0) {
				return;
			};
			song.loadSong(loadedSong.data);
			song.title = loadedSong.data.title;
			vm.songTitle = song.title;
		});
	}

	function playSong() {
		player.playSong(song.song, song.tempo);
	}

	function saveModal() {

		if (vm.songTitle.length === 0 ||
				song.song.length === 0) {
			return;
		}

 		var modalInstance = $modal.open({
 			templateUrl: 'saveModal.html',
 			controller: 'ModalCtrl',
 			controllerAs: 'modal',
 			resolve: {
 				songData: function() {
 					var songData = {
 						songTitle: vm.songTitle,
 						author: vm.user._id
 					};
 					return songData;
 				}
 			}
 		});

 		modalInstance.result.then(function(result) {
 			song.title = result.songTitle;
 			vm.songTitle = song.title;
 			getAllUserSongs(vm.user._id);
 		});

	}

	function tempoDown() {
		song.tempo -= 4;
		vm.tempo = song.tempo;
	}

	function tempoUp() {
		song.tempo += 4;
		vm.tempo = song.tempo;
	}
	

}
