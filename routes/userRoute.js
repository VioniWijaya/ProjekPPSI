const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { userController } = require('../controller');

router.get('/profile', userController.profile);
router.post('/profile', userController.updateProfile);

module.exports = router;
