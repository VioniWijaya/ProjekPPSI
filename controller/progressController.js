// const express = require('express');
// const Progres = require('../models/Progres');
// const Proker = require('../models/Proker');
const express = require('express');
const Proker = require('../models/Proker');
const Dinas = require('../models/Dinas');
const Progres = require('../models/Progres');
const Anggota = require('../models/Anggota');
const Anggota_Proker = require('../models/Anggota_proker');
const jwt = require('jsonwebtoken');

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

const create = async (req, res) => {
    try {
        const proker = await Proker.findAll({
            attributes: ['id_proker', 'nama_proker'], // Ambil hanya id_proker dan nama_proker
        });
        res.render('dinas/progress/create', { proker }); // Kirim data ke view
    } catch (error) {
        console.error(error.message);
    }
};



const store = async (req, res) => {
    let {
        id_proker,
        tanggal_pelaksanaan,
        kendala,
        jumlah_pelaksanaan,
        target,
        revisi,
    } = req.body;

    try {
        const progress = await Progres.create({
            id_progress: generateProgress(), // Fungsi untuk membuat ID unik
            id_proker, // Hubungkan ke program kerja
            tanggal_pelaksanaan,
            kendala,
            jumlah_pelaksanaan,
            target,
            revisi,
            file: req.file ? req.file.filename : null, // Jika file diupload
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.redirect('/dinas/progress'); // Redirect setelah sukses
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
};

module.exports = {
    index,
    create,
    store,
}