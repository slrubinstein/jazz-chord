'use strict';

angular.module('jazzChordApp')
  .controller('ChordsubstitutiontabsCtrl', ChordsubstitutiontabsCtrl);


function ChordsubstitutiontabsCtrl() {

	var vm = this;

	vm.tabs = [
    { title:'Major Subs', slice: [0, 4] },
    { title: 'Dom7 Subs', slice: [4, 10] },
    { title: 'minor Subs', slice: [10, 14] },
    { title: 'Tonic Subs', slice: [14, 16] },
  ];

}

