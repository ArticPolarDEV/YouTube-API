var express = require('express');
var path = require('path');
var ytdl = require('ytdl-core');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
require('dotenv').config();

var app = express();

// Routers
var getaudio = require('./routers/getaudio');
var version = require('./routers/version');

// All environments
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: "API Working"
  });
});

app.use('/api/getaudio', getaudio);
app.use('/api/version', version);

module.exports = app;
