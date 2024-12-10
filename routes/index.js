const express = require('express');
const router = express.Router();

router.use('/', require('./authRoute'));
router.use('/proker', require('./prokerRoute'));
router.use('/admin', require('./adminRoute'));
router.use('/user', require('./userRoute'));
router.use('/progress', require('./progressRoute'));

module.exports = router;