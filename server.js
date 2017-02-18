'use strict';

// App and Constants
const port = process.env.PORT || 8080
const express = require('express')
const app = express()

// // Mongo?
// const mongoose = require('mongoose'),
//
// // Models
// var Task = require('./api/models/hangman-game'),
//   bodyParser = require('body-parser');
//
// // Mongo settings
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/hangman');

// set API configs
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Routes!
var routes = require('./routes');
routes(app);


app.listen(port);

console.log('Running on http://localhost:' + port);
