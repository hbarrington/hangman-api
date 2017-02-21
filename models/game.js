'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  word: {
    type: String,
    required: true
  },
  wrong_guesses: {
    type: [],
  },
  partial_word: {
    type: String
  },
  number_of_guesses: {
    type: Number,
    default: 6
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'lost', 'won']
    }],
    default: ['pending']
  }
});

GameSchema.methods.update_partial_word = function(character){
  if (this.partial_word === undefined){
    this.partial_word = '_'.repeat(this.word.length)
  }
  var start = 0;
  while (this.word.indexOf(character, start) > -1){
    start = this.word.indexOf(character, start)+1 // we want it to check just after the character
    this.partial_word = this.partial_word.substr(0, start-1) + character + this.partial_word.substr(start)
  }
}

module.exports = mongoose.model('Games', GameSchema);
