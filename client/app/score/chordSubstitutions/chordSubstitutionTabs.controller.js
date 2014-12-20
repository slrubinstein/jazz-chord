'use strict';

angular.module('jazzChordApp')
  .controller('ChordsubstitutiontabsCtrl', ChordsubstitutiontabsCtrl);


function ChordsubstitutiontabsCtrl() {

	var vm = this;

	vm.tabs = [
    { title:'Major Substitutions' },
    { title: 'D7 Substitutions' }
  ];

}

