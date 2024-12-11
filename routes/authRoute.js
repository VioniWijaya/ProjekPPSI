var express = require('express');
var router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const controller = require('../controller/authController');
// const mhs = require('../controller/mhs.controller');
const verifyUser= require ('../middleware/verifyUser.middleware');



// Dalam routes/auth.route.js
router.get('/login', (req, res) => {
  res.render('login'); // Pastikan ini sesuai dengan nama file
});

router.post('/login', controller.login)
router.get('/logout', controller.logout)

// router.post('/logout', controller.logout);
// router.get('/beams',  mhs.authBeam);

module.exports = router;