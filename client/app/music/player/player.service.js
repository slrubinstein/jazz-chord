'use strict';

angular.module('jazzChordApp')
  .factory('player', player);

function player() {

  return {
    makeSynth: function() {
      var Synth = function(audiolet, frequency) {
        AudioletGroup.call(this, audiolet, 0, 1);
        // Basic wave
        this.sine = new Sine(audiolet, frequency * 1);
        this.sine2 = new Sine(audiolet, frequency * .5);

        // Gain envelope
        this.gain = new Gain(audiolet);
        this.env = new PercussiveEnvelope(audiolet, 1, 0.2, 0.1,
          function() {
            this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
          }.bind(this)
        );
        this.envMulAdd = new MulAdd(audiolet, .2, 0);

        // Main signal path
        this.sine.connect(this.gain);
        this.sine2.connect(this.gain);
        this.gain.connect(this.outputs[0]);

        // Envelope
        this.env.connect(this.envMulAdd);
        this.envMulAdd.connect(this.gain, 0, 1);
      };
      extend(Synth, AudioletGroup);
      return Synth;
    },

    playSong: function(song, bpm) {
      var Synth = this.makeSynth();
      var SchedulerApp = function(song, bpm) {
        this.audiolet = new Audiolet();
        this.audiolet.scheduler.setTempo(bpm)

        var allChords = [];

        song.forEach(function(measure) {

          measure.forEach(function(beat) {

            var chordFreqs = beat.frequencies;
            // check for rests
            if (beat.root === '/') {
              chordFreqs = [];
            }
            else {
              chordFreqs = beat.frequencies;
            }
            allChords.push(chordFreqs);
          })
        })
        var songPattern = new PSequence(allChords);

        this.audiolet.scheduler.play([songPattern], 1,
                                     this.playChord.bind(this));
      };

      SchedulerApp.prototype.playChord = function(chord) {
        for (var i = 0; i < chord.length; i++) {
          var frequency = chord[i]
          var synth = new Synth(this.audiolet, frequency);
          synth.connect(this.audiolet.output);
        }
      };
      var app = new SchedulerApp(song, bpm);
    },

    //-------------------------------------------------------------//

    playOne: function(beat) {
      var Synth = this.makeSynth();
      var SchedulerApp = function() {

        this.audiolet = new Audiolet();
        var chordFreqs = [];
        var frequencies = beat.frequencies;
        var chordPattern = new PSequence([frequencies]);
        this.audiolet.scheduler.play([chordPattern], 1,
                                     this.playChord.bind(this));
      }

      SchedulerApp.prototype.playChord = function(chord) {

        for (var i = 0; i < chord.length; i++) {
            var frequency = chord[i];
            var synth = new Synth(this.audiolet, frequency);
            synth.connect(this.audiolet.output);
        }
      };

      var app = new SchedulerApp(beat);
    }
  }
}
