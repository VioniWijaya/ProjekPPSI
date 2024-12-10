const express = require('express');
const router = express.Router();

router.use('/', require('./authRoute'));
router.use('/proker', require('./prokerRoute'));

module.exports = router;