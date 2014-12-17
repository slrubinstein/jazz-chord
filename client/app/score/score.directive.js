'use strict';

angular.module('jazzChordApp')
  .directive('score', function () {
    return {
      templateUrl: 'app/score/score.html',
      restrict: 'EA',
      controller: 'ScoreCtrl',
      controllerAs: 'score'
    };
  });