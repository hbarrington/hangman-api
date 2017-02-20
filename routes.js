'use strict';
module.exports = function(app) {
  var gameController = require('./controllers/gameController');

  // resourceful game Routes
  app.route('/games')
    .get(gameController.list_all_games)
    .post(gameController.create_a_game);

  app.route('/games/:gameId')
    .get(gameController.read_a_game)
    .put(gameController.update_a_game)
    .delete(gameController.delete_a_game);

};
