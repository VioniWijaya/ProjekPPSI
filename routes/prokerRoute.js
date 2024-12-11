const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { prokerController } = require('../controller');

router.get('/', prokerController.index);
router.get('/create', prokerController.create);
router.get('/notifikasi', prokerController.notifikasi);
router.post('/create', prokerController.store);
router.get('/edit/:id', prokerController.edit);
router.post('/edit/:id', prokerController.update);
router.get('/view/:id', prokerController.view);

module.exports = router;
