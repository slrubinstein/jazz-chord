'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice'];

function DashboardCtrl($scope, dataservice) {

	var vm = this;

	vm.addMeasure = addMeasure;
	vm.discardDraft = discardDraft;
	vm.playSong = playSong;
	vm.tempo = 120;
	vm.tempoDown = tempoDown;
	vm.tempoUp = tempoUp;
	vm.songTitle = '';
	vm.standards = dataservice.getAllStandards();
	vm.userSongs = dataservice.getAllUserSongs();

	function addMeasure() {

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
