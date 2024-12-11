var express = require('express');
var router = express.Router();
const islogin = require('../middleware/islogin.middleware')
const controllerDinas = require('../controller/kelolaDinasController')


router.get('/tambahDinas',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/tambahDinas'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/lihatDinas',islogin.verifyTokenAndRole(['admin']), controllerDinas.lihatDinas);

  router.get('/editDinas/:id',islogin.verifyTokenAndRole(['admin']), controllerDinas.editDinas);
  router.get('/lihatProgres',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/lihatProgres'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/kritikSaran',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/kritikSaran'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/tambahkritikSaran',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/tambahKritikSaran'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/editkritikSaran',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/editKritikSaran'); // Pastikan ini sesuai dengan nama file
  });

router.post('/tambahDinas', islogin.verifyTokenAndRole(['admin']), controllerDinas.tambahDinas);
router.post('/editDinas/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.updateDinas);
router.post('/hapusDinas/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.hapusDinas);

module.exports = router;