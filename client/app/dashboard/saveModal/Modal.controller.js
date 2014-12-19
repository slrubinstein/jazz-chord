'use strict';

angular.module('jazzChordApp')
  .controller('ModalCtrl', ModalCtrl) ;

 ModalCtrl.$inject = ['$modalInstance', 'song', 'songData',
 											'dataservice'];

 function ModalCtrl($modalInstance, song, songData,
 										dataservice) {

 	var vm = this;

 	vm.author = songData.author;
 	vm.cancel = cancel;
 	vm.deleteFromDB = deleteFromDB;
 	vm.discard = discard;
 	vm.save = save;
 	vm.songTitle = songData.songTitle;

  function cancel () {
    $modalInstance.dismiss('cancel');
  };

  function deleteFromDB() {
  	console.log('Not yet supported')
  	$modalInstance.close('not yet supported');
  }

  function discard() {
  	song.song.length = 0;
  	$modalInstance.close('draft discarded');
  }

 	function save() {
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


}
