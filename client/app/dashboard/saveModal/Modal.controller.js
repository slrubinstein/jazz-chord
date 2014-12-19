'use strict';

angular.module('jazzChordApp')
  .controller('ModalCtrl', ModalCtrl) ;

 ModalCtrl.$inject = ['$modalInstance', 'song', 'songData',
 											'dataservice'];

 function ModalCtrl($modalInstance, song, songData,
 										dataservice) {

 	var vm = this;

 	vm.songTitle = songData.songTitle;
 	vm.author = songData.author;

 	vm.save = function() {
 		dataservice.saveSong({
			title: vm.songTitle,
			beatsPerMeasure: song.beats,
			tempo: song.tempo,
			author: vm.author || '',
			song: song.song
		})
		.then(function() {
			$modalInstance.close('song saved');
		})
 	}

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}
