const express = require('express');
const router = express.Router();
const playlistController = require('../app/controllers/playlistController');
const auth = require('../app/utils/auth');

// Playlist routes
router.post('/', auth.allowIfLoggedin, playlistController.create);
router.get('/:id', auth.allowIfLoggedin, playlistController.getById);
router.get('/user/public', auth.allowIfLoggedin, playlistController.userPublic);
router.get('/user/private', auth.allowIfLoggedin, playlistController.userPrivate);
router.get('/all/public', auth.allowIfLoggedin, playlistController.allPublic)
router.delete('/:id', auth.allowIfLoggedin, playlistController.delete);
router.put('/:id', auth.allowIfLoggedin, playlistController.update);

module.exports = router;
