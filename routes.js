'use strict';
module.exports = function(app) {
  //var gameController = require('./controllers/gameController');

  // game Routes
  // app.route('/games')
  //   .get(gameController.list_all_games)
  //   .post(gameController.create_a_game);
  //
  //
  // app.route('/games/:gameId')
  //   .get(gameController.read_a_task)
  //   .put(gameController.update_a_task)
  //   .delete(gameController.delete_a_task);

  app.route('/')
    .get( function (req, res) { res.send('Hello World!!!') } )

};
