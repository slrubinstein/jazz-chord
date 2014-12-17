'use strict';

angular.module('jazzChordApp')
  .controller('ScoreCtrl', ScoreCtrl);

ScoreCtrl.$inject = ['song'];

function ScoreCtrl(song) {

	var vm = this;

	vm.deleteMeasure = deleteMeasure;
	vm.song = song.song;

	
	function deleteMeasure(index) {
		song.deleteMeasure(index);
	}

 }
