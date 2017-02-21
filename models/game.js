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

module.exports = mongoose.model('Games', GameSchema);
