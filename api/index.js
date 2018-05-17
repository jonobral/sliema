var express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const photoController = require('../controllers/photoController');
const folderController = require('../controllers/folderController');

router.get('/getComments', commentController.getComments);
router.post('/deleteComment', commentController.deleteComment);
router.post('/addComment', commentController.addComment);
router.post('/createPhotos', photoController.createPhotos);
router.post('/addLike', photoController.addPictureLikes);
router.post('/createFolders', folderController.createFolders);

module.exports = router;