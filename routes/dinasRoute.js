const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { prokerController } = require('../controller');
const { progressController } = require('../controller');
const { userController } = require('../controller');

router.get('/', prokerController.dashboard);

router.get('/proker/', prokerController.index);
router.get('/proker/create', prokerController.create);
router.post('/proker/create', prokerController.store);
router.get('/proker/edit/:id', prokerController.edit);
router.post('/proker/edit/:id', prokerController.update);
router.get('/proker/view/:id', prokerController.view);

router.get('/progress', progressController.index);

router.get('/profile', userController.profile);
router.post('/profile', userController.updateProfile);

module.exports = router;
