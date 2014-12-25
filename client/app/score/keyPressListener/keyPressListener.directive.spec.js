'use strict';

describe('Directive: keyPressListener', function () {

  // load the directive's module
  beforeEach(module('jazzChordApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<key-press-listener></key-press-listener>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the keyPressListener directive');
  }));
});