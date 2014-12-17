'use strict';

angular.module('jazzChordApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('score', {
        url: '/score',
        templateUrl: 'app/score/score.html',
        controller: 'ScoreCtrl'
      });
  });