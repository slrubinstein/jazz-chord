'use strict';

angular.module('jazzChordApp')
  .controller('ScoreCtrl', ScoreCtrl);

ScoreCtrl.$inject = ['$scope', 'song', 'musicSubstitutions'];

function ScoreCtrl($scope, song, musicSubstitutions) {

	var vm = this;

	vm.deleteMeasure = deleteMeasure;
	vm.makeSubs = makeSubs;
	vm.song = song.song;
	vm.substitutions = [];

	
	function deleteMeasure(index) {
		song.deleteMeasure(index);
	}

	function makeSubs(root) {
		vm.substitutions = musicSubstitutions.getSubs(root);
	}

 }
