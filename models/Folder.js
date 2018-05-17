const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const folderSchema = mongoose.Schema({
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
  }
});

folderSchema.index({
  name: 'text'
});

module.exports = mongoose.model('Folder', folderSchema);