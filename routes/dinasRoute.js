const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const { prokerController } = require('../controller');
// const { progressController, upload } = require('../controller');
const { userController } = require('../controller');
const progressController = require('../controller/progressController');
const upload = require('../middleware/upload.middleware');

router.get('/',isLogin.verifyTokenAndRole(['dinas']), prokerController.dashboard);

router.get('/proker/',isLogin.verifyTokenAndRole(['dinas']), prokerController.index);
router.get('/proker/create',isLogin.verifyTokenAndRole(['dinas']), prokerController.create);
router.post('/proker/create',isLogin.verifyTokenAndRole(['dinas']), prokerController.store);
router.get('/proker/edit/:id',isLogin.verifyTokenAndRole(['dinas']), prokerController.edit);
router.post('/proker/edit/:id',isLogin.verifyTokenAndRole(['dinas']), prokerController.update);
router.get('/proker/view/:id',isLogin.verifyTokenAndRole(['dinas']), prokerController.view);

router.get('/progress',isLogin.verifyTokenAndRole(['dinas']), progressController.index);
router.get('/progress/create',isLogin.verifyTokenAndRole(['dinas']), progressController.create);
router.post('/progress/create', isLogin.verifyTokenAndRole(['dinas']), upload.single('file'), progressController.store);
router.get('/progress/edit/:id', isLogin.verifyTokenAndRole(['dinas']), progressController.editProgres);
router.post('/progress/update/:id',isLogin.verifyTokenAndRole(['dinas']), upload.single('file'), progressController.updateProgres);
router.get('/progress/view/:id', isLogin.verifyTokenAndRole(['dinas']), progressController.lihatDetailProgres);
router.post('/progres/delete/:id', isLogin.verifyTokenAndRole(['dinas']), progressController.hapusProgres);

router.get('/profile',isLogin.verifyTokenAndRole(['dinas']), userController.profile);
router.post('/profile',isLogin.verifyTokenAndRole(['dinas']), userController.updateProfile);

module.exports = router;
