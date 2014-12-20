'use strict';

describe('Directive: chordSubstitutions', function () {

  // load the directive's module and view
  beforeEach(module('jazzChordApp'));
  beforeEach(module('app/score/chordSubstitutions/chordSubstitutions.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chord-substitutions></chord-substitutions>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the chordSubstitutions directive');
  }));
});