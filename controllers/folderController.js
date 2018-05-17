const mongoose = require('mongoose');
const Folder = mongoose.model('Folder');

exports.createFolders = async (req, res) => {
  const promises = [];
  req.body.forEach((element) => {
    const folder = Folder.findOneAndUpdate({ name: element.name }, element, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true
    }).exec();
    promises.push(folder);
  });

  const result = await Promise.all(promises);
  
  res.json(result);
};
