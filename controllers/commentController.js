const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const moment = require('moment');

exports.getComments = async (req, res) => {
  const comments = await Comment
    .find({ visible: true })
    .limit(1000).lean();

  const currentTime = moment(new Date);
  const result = comments.map((comment) => (
    {
      ...comment,
      isLocked: moment.duration(currentTime.diff(moment(comment.created))).asMinutes() > 5
    }
  ));

  res.json(result);
};

exports.addComment = async (req, res) => {
  const comment = await( new Comment(req.body).save())
    .catch((e) => console.error(e));

  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const deleted = await Comment.findOneAndUpdate({ _id: req.body.id }, 
    { visible: false }, {
      new: true
    }).exec()
      .catch((e) => console.error(e));

  res.json(deleted);
};
