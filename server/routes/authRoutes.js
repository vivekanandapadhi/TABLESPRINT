const express = require('express');
const { register, login,forgetpassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/forgetpassword",forgetpassword)

module.exports = router;
