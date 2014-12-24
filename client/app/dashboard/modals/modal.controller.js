'use strict';

angular.module('jazzChordApp')
  .controller('ModalCtrl', ModalCtrl) ;

 ModalCtrl.$inject = ['$modalInstance', 'song', 'songData',
                      'dataservice'];

 function ModalCtrl($modalInstance, song, songData,
                    dataservice) {

  var vm = this;

  vm.author = songData.author || null;
  vm.cancel = cancel;
  vm.deleteFromDB = deleteFromDB;
  vm.discard = discard;
  vm.save = save;
  vm.songTitle = songData.songTitle || '';
  vm.songId = songData.songId || null;

  function cancel () {
    $modalInstance.dismiss('cancel');
  };

  function deleteFromDB() {
    dataservice.deleteFromDB({
      songId: vm.songId,
      userId: vm.author
    })
    .then(function() {
      song.song.length = 0;  
      $modalInstance.close({msg: 'song deleted'});
    })
  }

  function discard() {
    song.song.length = 0;
    $modalInstance.close({msg: 'draft discarded'});
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
      $modalInstance.close({msg: 'song saved',
                            songTitle: vm.songTitle});
    })
  }


}
