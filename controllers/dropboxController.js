const Dropbox = require('dropbox').Dropbox;

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

exports.getFolders = dbx.filesListFolder({path: ''})
  .then(function(files) {
    return files.entries
      .filter((entry) => entry['.tag'] === 'folder')
      .map((entry) => ({
        name: entry.name,
        path: entry.path_display
      }));
  })
  .catch(function(error) {
    console.error(error);
  });


exports.getPhotos = (path) => dbx.filesListFolder({path: path.folder})
  .then(function(files) {
    const promises = files.entries
      .filter((entry) => entry['.tag'] === 'file')
      .map((entry) =>
        dbx.filesGetTemporaryLink({path: entry.path_display})
      );
    return Promise.all(promises)
      .then((payload) => (
        payload.map((entry) => ({
          name: entry.metadata.name,
          path: entry.link
        }))
      ));
  })
  .catch(function(error) {
    console.error(error);
  });
