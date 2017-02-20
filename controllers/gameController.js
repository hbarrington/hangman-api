'use strict';

var mongoose = require('mongoose'),
  Game = mongoose.model('Games');

exports.list_all_games = function(req, res) {
  Game.find({}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};


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


exports.update_a_game = function(req, res) {
  Game.findOneAndUpdate(req.params.gameId, req.body, {new: true}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};


exports.delete_a_game = function(req, res) {
  Game.remove({
    _id: req.params.gameId
  }, function(err, game) {
    if (err)
      res.send(err);
    res.json({ message: 'Game successfully deleted' });
  });
};
