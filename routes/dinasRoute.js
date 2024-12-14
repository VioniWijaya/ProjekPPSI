const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { prokerController } = require('../controller');
// const { progressController, upload } = require('../controller');
const { userController } = require('../controller');
const { progressController } = require('../controller');
const upload = require('../middleware/upload.middleware');

router.get('/', prokerController.dashboard);

router.get('/proker/', prokerController.index);
router.get('/proker/create', prokerController.create);
router.post('/proker/create', prokerController.store);
router.get('/proker/edit/:id', prokerController.edit);
router.post('/proker/edit/:id', prokerController.update);
router.get('/proker/view/:id', prokerController.view);

router.get('/progress',isLogin.verifyTokenAndRole(['dinas']), progressController.index);
router.get('/progress/create',isLogin.verifyTokenAndRole(['dinas']), progressController.create);
router.post('/progress/create', isLogin.verifyTokenAndRole(['dinas']), upload.single('file'), progressController.store);
router.get('/profile', userController.profile);
router.post('/profile', userController.updateProfile);

module.exports = router;
