'use strict';

var _ = require('lodash');
var Song = require('./song.model');
var User = require('../user/user.model');

var standards = ['54a08b20b3dd1e02007a264b']

// Get list of songs
exports.index = function(req, res) {
  Song.find({'_id': {$in: standards}},
    function (err, songs) {
    if(err) { return handleError(res, err); }
    return res.json(200, songs);
  });
};

// Get a single song
exports.show = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    return res.json(song);
  });
};

// Creates a new song in the DB, add it to User's songs.
exports.create = function(req, res) {
  Song.create(req.body, function(err, song) {
    if(err) { return handleError(res, err); }
      User.findById(req.body.author, function(err, user) {
        user.songs.push(song._id);
        user.save();
      })
    return res.json(201, song);
  });
};

// Updates an existing song in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Song.findById(req.params.id, function (err, song) {
    if (err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    var updated = _.merge(song, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, song);
    });
  });
};

// Deletes a song from the DB.
exports.destroy = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    song.remove(function(err) {
      if(err) { return handleError(res, err); }
      User.findById(req.params.userId, function(err, user) {
        if(!user) { return ; }
        _.pull(user.songs, req.params.id);
        user.save();
      });
      return res.send(204);
    });
  });
};

// Get all standards
exports.standards = function (req, res, next) {
  var userId = '549ae7572a62d302008b0835';
  User.findById(userId)
      .populate('songs')
      .exec(function (err, user) {
    if (err) return next(err);
    res.json(user.songs);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}