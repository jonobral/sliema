const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');

exports.createPhotos = async (req, res) => {
  const promises = [];
  req.body.forEach((element) => {
    const photo = Photo.findOneAndUpdate({ name: element.name }, element, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true
    }).exec();
    promises.push(photo);
  });

  const result = await Promise.all(promises);
  
  res.json(result);
};

exports.addPictureLikes = async (req, res) => {
  const photo = await Photo.findOneAndUpdate({ _id: req.body.id }, 
    { likes: req.body.likes }, {
      new: true
    }).exec();

  res.json(photo);
};