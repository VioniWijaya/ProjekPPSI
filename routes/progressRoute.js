const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { progressController } = require('../controller');

router.get('/', progressController.index);

router.get('/upload', progressController.upload);
router.get('/allprogress', progressController.allProgress);
// router.post('/create', prokerController.store);
// router.get('/upload', (req, res) => {
//     res.render('dinas/progress/upload'); // Pastikan ini sesuai dengan nama file
//   });

module.exports = router;
