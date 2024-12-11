const express = require('express');
const router = express.Router();

router.use('/', require('./authRoute'));
router.use('/dinas', require('./dinasRoute'));
router.use('/admin', require('./adminRoute'));

module.exports = router;