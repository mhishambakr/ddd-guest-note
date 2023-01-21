const express = require('express');

const router = express.Router();

const {registerUser} = require('../controllers/User.controller')

const {uploadUserPhoto, validateUserInput} = require('../middlewares/user.middlewares')


router.post('/register', uploadUserPhoto, validateUserInput, registerUser);

module.exports = router;