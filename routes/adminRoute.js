var express = require('express');
var router = express.Router();
const islogin = require('../middleware/islogin.middleware')
const controllerDinas = require('../controller/kelolaDinasController')


const controllerKritikSaran = require('../controller/kelolaKritikSaranController')

router.get('/tambahDinas',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/tambahDinas'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/lihatDinas',islogin.verifyTokenAndRole(['admin']), controllerDinas.lihatDinas);

  router.get('/editDinas/:id',islogin.verifyTokenAndRole(['admin']), controllerDinas.editDinas);
  router.get('/changePass/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.viewResetPassword)
  router.post('/changePass/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.resetPassword)
  router.get('/lihatProgres',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.lihatProgres);

  router.get('/kritikSaran',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.lihatKritikSaran);

  router.get('/tambahkritikSaran',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.viewTambahKritikSaran);
  router.post('/tambahkritikSaran',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.tambahKritikSaran);

  router.get('/editkritikSaran/:id',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.getEditKritikSaran);
  router.post('/editKritikSaran/:id',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.postEditKritikSaran);

  router.post('/hapusKritikSaran/:id', islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.hapusKritikSaran);
  router.get('/progres/:idProker', islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.progresbyproker);
  router.get('/proker/:idDinas', islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.prokerbydinas);

router.post('/tambahDinas', islogin.verifyTokenAndRole(['admin']), controllerDinas.tambahDinas);
router.post('/editDinas/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.updateDinas);
router.post('/hapusDinas/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.hapusDinas);


module.exports = router;