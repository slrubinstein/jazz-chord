'use strict';

angular.module('jazzChordApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'dataservice'];

function DashboardCtrl($scope, dataservice) {

	var vm = this;


	vm.songTitle = '';

	// save, load songs


	// tempo

}
