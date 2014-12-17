'use strict';

describe('Service: musicNotes', function () {

  // load the service's module
  beforeEach(module('jazzChordApp'));

  // instantiate service
  var musicNotes;
  beforeEach(inject(function (_musicNotes_) {
    musicNotes = _musicNotes_;
  }));

  it('should do something', function () {
    expect(!!musicNotes).toBe(true);
  });

});
