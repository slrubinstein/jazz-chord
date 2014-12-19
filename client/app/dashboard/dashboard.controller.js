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
	vm.discardDraft = discardDraft;
	vm.loadMySong = loadMySong;
	vm.mySong = '';
	vm.notes = musicNotes.noteNames;
	vm.playSong = playSong;
	vm.saveModal = saveModal;
	vm.songTitle = '';
	vm.substitutions = musicSubstitutions.substitutions;
	vm.standards = dataservice.getAllStandards();
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
		// getAllStandards();
	}

	function addMeasure(note) {
		song.addMeasure(note, vm.beats);
	}

	function discardDraft() {
		var modalInstance = $modal.open({
 			templateUrl: 'discardModal.html',
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

	}

	function getAllUserSongs(userId) {
		dataservice.getAllUserSongs(userId)
		.then(function(songs) {
			vm.userSongs = songs.data;
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

			$scope.$broadcast('updateSong', loadedSong.data.song)
		});
	}

	function playSong() {
		player.playSong(song.song, song.tempo);
	}

	function saveModal() {

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

 		modalInstance.result.then(function() {
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
