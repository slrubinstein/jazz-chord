'use strict';

describe('Service: musicSubstitutions', function () {

  // load the service's module
  beforeEach(module('jazzChordApp'));

  // instantiate service
  var musicSubstitutions;
  beforeEach(inject(function (_musicSubstitutions_) {
    musicSubstitutions = _musicSubstitutions_;
  }));

  it('should do something', function () {
    expect(!!musicSubstitutions).toBe(true);
  });

});
