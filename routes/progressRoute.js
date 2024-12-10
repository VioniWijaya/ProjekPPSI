const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { progressController } = require('../controller');

router.get('/', progressController.index);

module.exports = router;
