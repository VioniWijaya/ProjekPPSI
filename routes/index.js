const express = require('express');
const router = express.Router();

router.use('/', require('./authRoute'));
router.use('/proker', require('./prokerRoute'));
router.use('/admin', require('./adminRoute'));

module.exports = router;