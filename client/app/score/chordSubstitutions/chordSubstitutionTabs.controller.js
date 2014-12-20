'use strict';

angular.module('jazzChordApp')
  .controller('ChordsubstitutiontabsCtrl', ChordsubstitutiontabsCtrl);


function ChordsubstitutiontabsCtrl() {

	var vm = this;

	vm.tabs = [
    { title:'Major Subs', slice: [0, 3] },
    { title: 'Dom7 Subs', slice: [4, 9] },
    { title: 'minor Subs', slice: [10, 13] },
    { title: 'Tonic Subs', slice: [14, 16] },
  ];

}

