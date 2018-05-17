const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const photoSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'You must supply a name!'
  },
  path: {
    type: String,
    required: 'Missing path!'
  },
  likes: {
    type: Number,
    default: 0
  }
});

// Define our indexes
photoSchema.index({
  name: 'text'
});

module.exports = mongoose.model('Photo', photoSchema);