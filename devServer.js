var path = require('path');
var express = require('express');
const router = express.Router();
var webpack = require('webpack');
var config = require('./webpack.config.dev');

require('./models/Review');

const reviewController = require('./controllers/reviewController');

var app = express();
var compiler = webpack(config);

const mongoose = require('mongoose');

// import environmental variables from our variables.env file
// require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle bad connections
mongoose.connect('mongodb://jonobral:jonobral@ds133211.mlab.com:33211/bruges');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

router.get('/api/search', reviewController.getReviews);

app.use('/', router);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});
