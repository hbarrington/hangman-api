'use strict';

var mongoose = require('mongoose'),
  Game = mongoose.model('Games');

// used on the index action to find available games
exports.list_all_games = function(req, res) {
  Game.find({}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

// create a new game by passing in a word or phrase
exports.create_a_game = function(req, res) {
  var new_game = new Game(req.body);
  new_game.save(function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};


exports.read_a_game = function(req, res) {
  Game.findById(req.params.gameId, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

// used for guessing (only)
// allows a guess param and updates wrong_guesses or partial_word as needed
exports.update_a_game = function(req, res) {

  // check for `guess` in req.body
  var guess = req.body['guess']
  if (guess === 'undefined')
    err['errors']['guess']['message'] = "Guess is required"

  if (guess.length > 1)
    err['errors']['guess']['message'] = 'Guess can only be one character'

  Game.findById(req.params.gameId, function(err, game) {
    if (err)
      res.send(err);

    // update partial word
    if (game.word.indexOf(guess) > -1){
      console.log("hit")
    } else {
      game.wrong_guesses.push(guess)
    }

    // check for game over - loss
    if (game.wrong_guesses.length > game.number_of_guesses)
      game.status = "lost"

    // check for game over - win
    if (game.partial_word === game.word)
      game.status = "won"

    console.log(game)
    Game.findOneAndUpdate(req.params.gameId, game, {new: true}, function(err, game) {
      console.log(req.params)
      console.log(game)
      if (err)
        res.send(err);
      res.json(game);
    });

  });
};


// deletes a game  :)
exports.delete_a_game = function(req, res) {
  Game.remove({
    _id: req.params.gameId
  }, function(err, game) {
    if (err)
      res.send(err);
    res.json({ message: 'Game successfully deleted' });
  });
};
