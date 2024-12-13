var express = require('express');
var router = express.Router();
const islogin = require('../middleware/islogin.middleware')
const controllerDinas = require('../controller/kelolaDinasController')
const controllerAdmin = require('../controller/adminController');
const controllerProker = require('../controller/prokerController');
const controllerKritikSaran = require('../controller/kelolaKritikSaranController')
const Proker = require('../models/Proker');
const Progres = require('../models/Progres');


router.get('/tambahDinas',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
    res.render('admin/tambahDinas'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/lihatDinas',islogin.verifyTokenAndRole(['admin']), controllerDinas.lihatDinas);

  router.get('/editDinas/:id',islogin.verifyTokenAndRole(['admin']), controllerDinas.editDinas);

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

  //router.get('/dashboardAdmin',islogin.verifyTokenAndRole(['admin']),  (req, res) => {
   // res.render('admin/dashboardAdmin'); // Pastikan ini sesuai dengan nama file
  //});

  router.get('/dashboardAdmin', islogin.verifyTokenAndRole(['admin']), async (req, res) => {
    try {
        async function getTerlaksanaCount() {
          const count = await Proker.count({ where: { status: 'terlaksana' } });
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
        async function getProgressCount() {
          const count = await Progres.count();
          return count;
        }
        // // Data contoh (gantilah ini dengan data asli dari database atau logika Anda)
        const terlaksana = await getTerlaksanaCount();  // Ambil jumlah item terlaksana
        const berjalan = await getBerjalanCount();      // Ambil jumlah item sedang berjalan
        const belumTerlaksana = await getBelumTerlaksanaCount(); // Ambil jumlah item belum terlaksana
        const progress = await getProgressCount();      // Ambil jumlah item progres
        // const terlaksana = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Data contoh
        // const berjalan = 5;
        // const belumTerlaksana = 15;
        // const progress = 20;
        // Kirimkan variabel ke tampilan
        res.render('admin/dashboardAdmin', {
          terlaksana,
          berjalan,
          belumTerlaksana,
          progress
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