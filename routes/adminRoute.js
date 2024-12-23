var express = require('express');
var router = express.Router();
const islogin = require('../middleware/islogin.middleware')
const controllerDinas = require('../controller/kelolaDinasController')

const controllerAdmin = require('../controller/adminController');
const controllerProker = require('../controller/prokerController');
const controllerKritikSaran = require('../controller/kelolaKritikSaranController')
const Proker = require('../models/Proker');
const Progres = require('../models/Progres');
const Dinas = require('../models/Dinas');

router.get('/tambahDinas',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/tambahDinas'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/lihatDinas',islogin.verifyTokenAndRole(['admin']), controllerDinas.lihatDinas);

  router.get('/editDinas/:id',islogin.verifyTokenAndRole(['admin']), controllerDinas.editDinas);
  router.get('/changePass/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.viewResetPassword)
  router.post('/changePass/:id', islogin.verifyTokenAndRole(['admin']), controllerDinas.resetPassword)
  router.get('/lihatProgres',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.lihatProgres);
  router.get('/lihatDetailProgres/:id',islogin.verifyTokenAndRole(['admin']), controllerKritikSaran.lihatDetailProgres);

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

router.get('/dashboardAdmin', islogin.verifyTokenAndRole(['admin']), async (req, res) => {
  try {
      async function getProkerCount() {
        const count = await Proker.count();
        return count;
      }
      
      async function getDinasCount() {
        const count = await Dinas.count();
        return count;
      }
      
      async function getProgressCount() {
        const count = await Progres.count();
        return count;
      }
      async function getTerlaksanaCount() {
        const count = await Proker.count({ where: { status: 'terlaksana' } });
        console.log(count);
        return count;
      }
      
      async function getBerjalanCount() {
        const count = await Proker.count({ where: { status: 'berjalan' } });
        return count;
      }
      
      async function getBelumTerlaksanaCount() {
        const count = await Proker.count({ where: { status: 'belum terlaksana' } });
        return count;
      }
      
      // // Data contoh (gantilah ini dengan data asli dari database atau logika Anda)
      const terlaksana = await getTerlaksanaCount();  // Ambil jumlah item terlaksana
      const berjalan = await getBerjalanCount();      // Ambil jumlah item sedang berjalan
      const belumTerlaksana = await getBelumTerlaksanaCount(); // Ambil jumlah item belum terlaksana
      const proker = await getProkerCount();  // Ambil jumlah item terlaksana
      const dinas = await getDinasCount();      // Ambil jumlah item sedang dinas
      const progress = await getProgressCount();      // Ambil jumlah item progres
      res.render('admin/dashboardAdmin', {
        proker,
        dinas,
        progress,
        terlaksana,
        berjalan,
        belumTerlaksana
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Kesalahan server');
  }
});

router.get('/profile', islogin.verifyTokenAndRole(['admin']), controllerAdmin.profile);
router.post('/profile', islogin.verifyTokenAndRole(['admin']), controllerAdmin.updateProfile);
router.post('/dashboardAdmin', islogin.verifyTokenAndRole(['admin']), controllerProker.dashboardAdmin);


module.exports = router;