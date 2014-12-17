'use strict';

describe('Service: song', function () {

  // load the service's module
  beforeEach(module('jazzChordApp'));

  // instantiate service
  var song;
  beforeEach(inject(function (_song_) {
    song = _song_;
  }));

  it('should do something', function () {
    expect(!!song).toBe(true);
  });

});
