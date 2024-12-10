const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { prokerController } = require('../controller');

router.get('/', prokerController.index);

module.exports = router;
