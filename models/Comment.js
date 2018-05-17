const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: 'You must supply an author!'
  },
  photoId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo',
    required: 'You must supply a picture!'
  },
  comment: {
    type: String,
    required: 'Your comment must have text!'
  },
  visible: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Comment', commentSchema);