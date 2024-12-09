var express = require('express');
var router = express.Router();


router.get('/tambahDinas', (req, res) => {
    res.render('admin/tambahDinas'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/lihatDinas', (req, res) => {
    res.render('admin/lihatDinas'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/editDinas', (req, res) => {
    res.render('admin/editDinas'); // Pastikan ini sesuai dengan nama file
  });
  router.get('/lihatProgres', (req, res) => {
    res.render('admin/lihatProgres'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/kritikSaran', (req, res) => {
    res.render('admin/kritikSaran'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/tambahkritikSaran', (req, res) => {
    res.render('admin/tambahKritikSaran'); // Pastikan ini sesuai dengan nama file
  });

  router.get('/editkritikSaran', (req, res) => {
    res.render('admin/editKritikSaran'); // Pastikan ini sesuai dengan nama file
  });

  
module.exports = router;