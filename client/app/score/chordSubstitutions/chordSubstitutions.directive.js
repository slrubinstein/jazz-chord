'use strict';

angular.module('jazzChordApp')
  .directive('chordSubstitutions', function () {
    return {
      templateUrl: 'app/score/chordSubstitutions/chordSubstitutions.html',
      restrict: 'E',
      controller: 'ChordsubstitutiontabsCtrl',
      controllerAs: 'subtabs'
    };
  });