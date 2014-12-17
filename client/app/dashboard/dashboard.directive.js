'use strict';

angular.module('jazzChordApp')
  .directive('dashboard', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dash'
    };
  });