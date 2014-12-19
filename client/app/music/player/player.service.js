'use strict';

angular.module('jazzChordApp')
  .factory('playerFactory', playerFactory);

function playerFactory() {

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

    determineChordType: function(chordRoot, currentRoot, currentChord) {
      var chordType = '';

      var notes = ['A', 'B\u266d', 'B', 'C', 'C\u266f', 'D',
                       'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d'];
            
        if (currentRoot === chordRoot) {
          chordType = currentChord;
        } 
        else {
          var distance = (notes.indexOf(currentRoot) - notes.indexOf(chordRoot));
          if (distance === 4 || distance === -8) {
            chordType = 'iii' + currentChord;
          } 
          else if (distance === 9 || distance === -3) {
            chordType = 'vi' + currentChord;
          }
          else if (distance === -1 || distance === 11) {
          chordType = 'vii' + currentChord;
          }
          else if (distance === -9 || distance === 3) {
            chordType = '\u266fii' + currentChord;
          }
          else if (distance === 6 || distance == -6) {
            chordType = '\u266fIV' + currentChord;
          }
        }
      return chordType;
    },

    playSong: function(song, bpm) {
      var self = this;

      var Synth = this.makeSynth();
      var SchedulerApp = function(song, bpm) {
        this.audiolet = new Audiolet();
        this.audiolet.scheduler.setTempo(bpm)

        var allChords = [];

        song.forEach(function(measure) {

          measure.forEach(function(beat) {

            var chordFreqs = [];
            // check for rests
            if (beat.currentChord === '/') {
              chordFreqs = [];
            }
            else {
              var chordType = self.determineChordType(beat.root, beat.currentroot, beat.currentChord)
              var frequencies = beat.chords[chordType].frequencies;
              frequencies.forEach(function(f) {
                chordFreqs.push(f);
              });
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
      var self = this;
      var Synth = this.makeSynth();

      var SchedulerApp = function() {
        this.audiolet = new Audiolet();

        var chordFreqs = [];

        var chordType = self.determineChordType(beat.root, beat.currentroot, beat.currentChord)

        var frequencies = beat.chords[chordType].frequencies;

        frequencies.forEach(function(f) {
          chordFreqs.push(f);
        });

        var chordPattern = new PSequence([chordFreqs]);

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