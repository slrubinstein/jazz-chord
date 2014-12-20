'use strict';

describe('Controller: ChordsubstitutiontabsCtrl', function () {

  // load the controller's module
  beforeEach(module('jazzChordApp'));

  var ChordsubstitutiontabsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChordsubstitutiontabsCtrl = $controller('ChordsubstitutiontabsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
