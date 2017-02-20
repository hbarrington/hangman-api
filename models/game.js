'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  word: {
    type: String,
    Required: 'the word or phrase to be guessed is required'
  },
  wrong_guesses: {
    type: [],
  },
  word_status: {
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
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Games', GameSchema);
