const express = require('express');
const router = express.Router();
const movieController = require('../app/controllers/movieController');
const auth = require('../app/utils/auth');

// Movie routes
router.get('/search', auth.allowIfLoggedin, movieController.searchMovie);

module.exports = router;
