const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

// User routes

router.post('/login',userController.register);
router.post('/register', userController.login);

module.exports = router;
