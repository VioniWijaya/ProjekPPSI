const response = require('express')
require('dotenv').config()
require('../models/relasi')
const modelUser = require('../models/User')
const modelDinas = require('../models/Dinas')
const modelProker = require('../models/Proker')
const modelNotifikasi = require('../models/Proker')
const modelProgres = require('../models/Progres');
const modelKritikSaran = require('../models/KritikSaran')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    Op
} = require('sequelize')

const lihatProgres = async (req, res) => {
    try {
        const progres = await modelProgres.findAll({
            include: [{
                model: modelProker, // Including "proker" through "progres"
                as: 'dataProker',
                include: [{
                    model: modelDinas, // Including "dinas" through "proker"
                    as: 'dataDinas'
                }]
            }]
        });

        res.render('admin/lihatProgres', {
            progres,
            page: 'Lihat Progres',
            success: req.cookies.success,
            error: req.cookies.error,
        });
    } catch (error) {
        console.error('Error fetching Progres:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
};

const lihatDetailProgres = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        // Ambil data progres berdasarkan ID
        const progres = await modelProgres.findByPk(id, {
            include: [{
                model: modelProker,
                as: 'dataProker',
            }, ],
        });

        // Jika data tidak ditemukan
        if (!progres) {
            return res.status(404).render('admin/detailProgres', {
                success: false,
                message: 'Data progres tidak ditemukan.',
            });
        }

        // Render view dengan data progres
        res.render('admin/detailProgres', {
            progres
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
}
const lihatKritikSaran = async (req, res) => {
    try {
        const kritik_saran = await modelKritikSaran.findAll({
            include: [{
                model: modelProgres, // Including the "progres" model
                as: 'dataProgres',
                include: [{
                    model: modelProker, // Including "proker" through "progres"
                    as: 'dataProker',
                    include: [{
                        model: modelDinas, // Including "dinas" through "proker"
                        as: 'dataDinas'
                    }]
                }]
            }]
        });

        res.render('admin/kritikSaran', {
            kritik_saran,
            page: 'Lihat Kritik Saran',
            success: req.cookies.success,
            error: req.cookies.error,
        });
    } catch (error) {
        console.error('Error fetching Kritik Saran:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
};

const viewTambahKritikSaran = async (req, res) => {
    try {
        const progres = await modelProker.findAll({
            include: [{
                    model: modelProgres, // Including "progres" through "proker"
                    as: 'dataProgres',
                },
                {
                    model: modelDinas, // Including "dinas" through "proker"
                    as: 'dataDinas'
                }
            ]
        });
        const dinas = await modelDinas.findAll()
        res.render('admin/tambahkritikSaran', {
            progres,
            dinas,
            page: 'Lihat Progres',
            success: req.cookies.success,
            error: req.cookies.error,
        });
    } catch (error) {
        console.error('Error fetching Progres:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
}

// API untuk mendapatkan program kerja berdasarkan dinas
const prokerbydinas = async (req, res) => {
    const {
        idDinas
    } = req.params;
    try {
        const proker = await modelProker.findAll({
            where: {
                id_dinas: idDinas
            },
            attributes: ['id_proker', 'nama_proker'],
        });
        res.json(proker);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching program kerja.'
        });
    }
};

// API untuk mendapatkan progres berdasarkan program kerja
const progresbyproker = async (req, res) => {
    const {
        idProker
    } = req.params;
    try {
        const progres = await modelProgres.findAll({
            where: {
                id_proker: idProker
            },
            attributes: ['id_progres', 'waktu_pelaksanaan', 'target'],
        });
        res.json(progres);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching progres.'
        });
    }
};

const tambahKritikSaran = async (req, res) => {
    try {
        console.log(req.body);

        const {
            id_progres,
            isi
        } = req.body;

        // Validasi input
        if (!id_progres || !isi) {
            return res.status(400).json({
                success: false,
                message: 'ID Progres dan isi kritik & saran wajib diisi!',
            });
        }

        // Validasi ID Progres (Opsional)
        const progres = await modelProgres.findOne({
            where: {
                id_progres
            }
        });
        if (!progres) {
            return res.status(404).json({
                success: false,
                message: 'ID Progres tidak ditemukan!',
            });
        }

        // Buat ID untuk kritik & saran
        const generateIdKritikSaran = () => {
            const prefix = 'KS';
            const timestampPart = Date.now().toString().slice(-8);
            return `${prefix}${timestampPart}`;
        }; // Membuat ID unik
        const id_kritikdansaran = generateIdKritikSaran()
        const tanggal = Date.now()
        // Simpan ke database
        const kritikSaran = await modelKritikSaran.create({
            id_kritikdansaran,
            id_progres,
            isi,
            tanggal
        });

        return res.status(201).json({
            success: true,
            message: 'Kritik & saran berhasil ditambahkan!',
            data: kritikSaran,
        });
    } catch (error) {
        console.error('Error menambahkan kritik & saran:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
        });
    }
};


const hapusKritikSaran = async (req, res) => {
    const {
        id
    } = req.params;

    const kritikdansaran = await modelKritikSaran.findByPk(id);
    if (!kritikdansaran) {
        return res.status(404).json({
            success: false,
            message: 'kritikdansaran tidak ditemukan.'
        });
    }

    // Hapus data kritikdansaran
    await modelKritikSaran.destroy({
        where: {
            id_kritikdansaran: id
        }
    });

    let success = "Kritik Saran Berhasil Di Hapus";
    res.cookie("success", success, {
        maxAge: 1000,
        httpOnly: true
    });
    res.redirect("/admin/kritikSaran");
}
const getEditKritikSaran = async (req, res) => {
    const {
        id
    } = req.params; // Ambil ID kritik dan saran dari URL

    try {
        // Ambil data kritik_saran beserta progres, proker, dan dinas terkait
        const kritikSaran = await modelKritikSaran.findOne({
            where: {
                id_kritikdansaran: id
            },
            include: [{
                model: modelProgres,
                as: 'dataProgres',
                include: [{
                    model: modelProker,
                    as: 'dataProker',
                    include: [{
                        model: modelDinas,
                        as: 'dataDinas',
                    }, ],
                }, ],
            }, ],
        });

        if (!kritikSaran) {
            return res.status(404).send('Data Kritik dan Saran tidak ditemukan');
        }

        // Ambil semua dinas untuk dropdown
        const dinas = await modelDinas.findAll({
            include: [{
                model: modelUser,
                as: 'dataUser'
            }],
        });

        // Ambil program kerja berdasarkan dinas terkait
        const proker = await modelProker.findAll({
            where: {
                id_dinas: kritikSaran.dataProgres.dataProker.id_dinas
            },
        });

        // Ambil progres berdasarkan proker terkait
        const progres = await modelProgres.findAll({
            where: {
                id_proker: kritikSaran.dataProgres.id_proker
            },
        });
        console.log(progres);
        console.log(proker);
        console.log(dinas);

        // Kirim data ke view edit
        res.render('admin/editKritikSaran', {
            kritikSaran,
            dinas,
            proker,
            progres,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Terjadi kesalahan server');
    }
};

const postEditKritikSaran = async (req, res) => {
    const {
        id
    } = req.params; // Ambil ID kritik dan saran dari URL
    const {
        id_progres,
        isi
    } = req.body; // Ambil input form

    try {
        // Cari data kritik_saran berdasarkan ID
        const kritikSaran = await modelKritikSaran.findByPk(id);

        if (!kritikSaran) {
            return res.status(404).send('Data Kritik dan Saran tidak ditemukan');
        }

        // Update data kritik_saran
        await kritikSaran.update({
            id_progres,
            isi,
        });

        // Redirect ke halaman daftar kritik dan saran
        res.redirect('/admin/kritikSaran'); // Sesuaikan dengan URL daftar kritik dan saran
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Terjadi kesalahan server');
    }
};

module.exports = {
    lihatProgres,
    lihatKritikSaran,
    viewTambahKritikSaran,
    prokerbydinas,
    progresbyproker,
    tambahKritikSaran,
    hapusKritikSaran,
    getEditKritikSaran,
    postEditKritikSaran,
    lihatDetailProgres
};