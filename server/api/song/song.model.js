'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  title: String,
  beatsPerMeasure: Number,
  beatsPerMinute: Number,
  tempo: Number,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  song: []
});

module.exports = mongoose.model('Song', SongSchema);