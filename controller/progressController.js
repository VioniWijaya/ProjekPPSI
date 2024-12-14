const express = require('express');
const Proker = require('../models/Proker');
const Dinas = require('../models/Dinas');
const Progres = require('../models/Progres');
const Anggota = require('../models/Anggota');
const Anggota_Proker = require('../models/Anggota_proker');
const jwt = require('jsonwebtoken');
const multer = require("multer");


const index = async (req, res) => {
    month = res.body ? res.body.month : new Date().getMonth() + 1;
    try {
        const progress = await Progres.findAll({
            include: {
                model: Proker,
                attributes: ['nama_proker'],
                as: 'dataProker'
            }
        });
        res.render('dinas/progress/index', {progress, month});
    } catch (error) {
        console.error(error.message);
    }
}




// const create = async (req, res) => {
//     try {
//         const anggota = await Anggota.findAll();
//         res.render('dinas/progress/create', {anggota});
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/'); 
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     }
// });


// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type, only JPEG, PNG, and PDF is allowed!"),
//       false
//     );
//   }
// };


// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, 
//   },
//   fileFilter: fileFilter,
// });


// const create = async (req, res) => {
//     try {
//         const proker = await Proker.findAll({
//             attributes: ['id_proker', 'nama_proker'], // Ambil hanya id_proker dan nama_proker
//         });
//         res.render('dinas/progress/create', { proker }); // Kirim data ke view
//     } catch (error) {
//         console.error(error.message);
//     }
// };

const create = async (req, res) => {
    try {
        const idUser = req.user.id;
        // Dapatkan program kerja hanya dari dinas yang login
        const dinas = await Dinas.findOne({
            where:{
                id_user: idUser
            }
        })
        
        const proker = await Proker.findAll({
            where: { id_dinas: dinas.id_dinas },  // Filter berdasarkan dinas
            attributes: ['id_proker', 'nama_proker'], 
        });
        
        res.render('dinas/progress/create', { proker });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
};


const store = async (req, res) => {
    const {
        id_proker,
        tanggal_pelaksanaan,
        kendala,
        jumlah_pelaksanaan,
        target,
        revisi,
    } = req.body;

    try {
        // Validasi data input
        if (!id_proker || !tanggal_pelaksanaan) {
            throw new Error('ID Program Kerja dan Tanggal Pelaksanaan wajib diisi.');
        }
        const generateProgress= ()=>{
            const prefix = 'Prog';
            const timestampPart = Date.now().toString().slice(-6);
            return `${prefix}${timestampPart}`;
        }
        
        // Simpan data ke database
        const progress = await Progres.create({
            id_progres: generateProgress(), // ID unik
            id_proker,
            waktu_pelaksanaan: tanggal_pelaksanaan,
            kendala,
            jumlah_pelaksanaan: jumlah_pelaksanaan || null, // Nilai default null jika tidak diisi
            target,
            revisi,
            file_upload: req.file ? req.file.filename : null, // Nama file dari multer
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.redirect('/dinas/progress'); // Redirect setelah sukses
    } catch (error) {
        console.error(error.message);

        // Hapus file jika terjadi error setelah upload
        if (req.file) {
            const fs = require('fs');
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Gagal menghapus file:', err.message);
            });
        }

        res.status(500).send('Terjadi kesalahan pada server.');
    }
};


module.exports = {
    index,
    create,
    store,
}