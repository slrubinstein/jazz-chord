'use strict';

describe('Service: musicChords', function () {

  // load the service's module
  beforeEach(module('jazzChordApp'));

  // instantiate service
  var musicChords;
  beforeEach(inject(function (_musicChords_) {
    musicChords = _musicChords_;
  }));

  it('should do something', function () {
    expect(!!musicChords).toBe(true);
  });

});
