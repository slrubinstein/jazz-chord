'use strict';

angular.module('jazzChordApp')
  .directive('modals', function () {
    return {
      templateUrl: 'app/dashboard/modals/modals.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });