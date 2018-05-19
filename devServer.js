var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
const bodyParser = require('body-parser');

require('dotenv').config({ path: __dirname + '/config.env' });

// import models
require('./models/Comment');
require('./models/Photo');
require('./models/Folder');
const routes = require('./api/index');

var app = express();
var compiler = webpack(config);

const mongoose = require('mongoose');

// Connect to our Database and handle bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Generate API routes
app.use('/api', routes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server is listening on port ${process.env.PORT}`);
});
