'use strict';

// App and Constants
const port = process.env.PORT || 8080 // API-express port
const mongo_host = process.env.MONGO_HOST || 'mongodb'
const express = require('express')
const app = express()

// Mongo
const mongoose = require('mongoose')

// Models
var Game = require('./models/game'),
  bodyParser = require('body-parser');

// Mongo settings
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+mongo_host+'/hangman'); // default 27017 tcp port

// set API configs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));

// Routes!
var routes = require('./routes');
routes(app);


app.listen(port);

console.log('Running on http://localhost:' + port);
