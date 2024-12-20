const express = require('express');
const Proker = require('../models/Proker');
const Dinas = require('../models/Dinas');
const Progress = require('../models/Progres');
const Anggota = require('../models/Anggota');
const Anggota_Proker = require('../models/Anggota_proker');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const fs = require('fs');
const path = require('path');

// const index = async (req, res) => {
//     try {
//         const proker = await Proker.findAll();
//         res.render('dinas/proker/index', {proker});
//         // res.render('dinas/proker/index');
//     } catch (error) {
//         console.error(error.message);
//     }
// }


const index = async (req, res) => {
    try {
        const id_user = await getIdUser(req, res);
        const dinas = await Dinas.findOne({
            where: {
                id_user
            }
        });

        const proker = await Proker.findAll({
            where: {
                id_dinas: dinas.id_dinas, // Only fetch proker for the current dinas
            }
        });
        res.render('dinas/proker/index', {proker});
    } catch (error) {
        console.error(error.message);
    }
}

const view = async (req, res) => {
    try {
        const anggota = await Anggota.findAll();
        const proker = await Proker.findOne({
            where: {
                id_proker: req.params.id
            },
            include: {
                model: Anggota,
                as: 'dataAnggota'
            }
        });
        res.render('dinas/proker/view', {anggota,proker});
    } catch (error) {
        console.error(error.message);
    }
}

const create = async (req, res) => {
    try {
        const anggota = await Anggota.findAll();
        res.render('dinas/proker/create', {anggota});
    } catch (error) {
        console.error(error.message);
    }
}

const store = async (req, res) => {
    let {
        nama_proker,
        kegiatan,
        tujuan,
        sasaran,
        target_waktu,
        tempat,
        status,
        anggaran,
        anggota
    } = req.body;
    try {
        // Generate ID Dinas
        const generateProker = () => {
            const prefix = 'PRO-';
            const timestampPart = Date.now().toString().slice(-4);
            return `${prefix}${timestampPart}`;
        };

        const id_user = await getIdUser(req, res);

        const dinas = await Dinas.findOne({
            where: {
                id_user
            }
        });
        const proker = await Proker.create({
            id_proker: generateProker(), // temporary id_proker
            nama_proker,
            id_dinas: dinas.id_dinas,
            kegiatan,
            tujuan,
            sasaran,
            target_waktu,
            tempat,
            status,
            anggaran,
        });

        // Save anggota proker

        // check if anggota is array
        if (!Array.isArray(anggota)) {
            const anggotaArr = [];
            anggotaArr.push(anggota);
            anggota = anggotaArr;
        }
        anggota.forEach(async (id_anggota) => {
            const anggota_proker = await Anggota_Proker.create({
                id_proker: proker.id_proker,
                id_anggota,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });

        if (!proker) {
            return res.redirect('/dinas/proker/create');
        }else{
            return res.redirect('/dinas/proker');
        }
    } catch (error) {
        console.error(error.message);
    }
}

const edit = async (req, res) => {
    try {
        const anggota = await Anggota.findAll();
        const proker = await Proker.findOne({
            where: {
                id_proker: req.params.id
            },
            include: {
                model: Anggota,
                as: 'dataAnggota'
            }
        });
        res.render('dinas/proker/edit', {anggota,proker});
    } catch (error) {
        console.error(error.message);
    }
}

const update = async (req, res) => {
    let {
        nama_proker,
        pj_proker,
        kegiatan,
        tujuan,
        sasaran,
        target_waktu,
        tempat,
        status,
        anggaran,
        anggota
    } = req.body;
    try {
        // save proker to database
        const proker = await Proker.update({
            nama_proker,
            pj_proker,
            kegiatan,
            tujuan,
            sasaran,
            target_waktu,
            tempat,
            status,
            anggaran,
        }, {
            where: {
                id_proker: req.params.id
            }
        });

        // delete anggota proker
        await Anggota_Proker.destroy({
            where: {
                id_proker: req.params.id
            }
        });

        // check if anggota is array
        if (!Array.isArray(anggota)) {
            const anggotaArr = [];
            anggotaArr.push(anggota);
            anggota = anggotaArr;
        }

        // Save anggota proker
        anggota.forEach(async (id_anggota) => {
            const anggota_proker = await Anggota_Proker.create({
                id_proker: req.params.id,
                id_anggota,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });

        if (!proker) {
            return res.redirect('/dinas/proker/edit/' + req.params.id);
        }else{
            return res.redirect('/dinas/proker');
        }
    } catch (error) {
        console.error(error.message);
    }
}

const getIdUser = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;

    return req.user.id;
}

const dashboard = async (req, res) => {
    try {
        const id_user = await getIdUser(req, res);
        const dinas = await Dinas.findOne({
            where: {
                id_user
            }
        });

        const berjalan = await Proker.findAll({
            where: {
                status: 'berjalan',
                id_dinas: dinas.id_dinas,
            }
        });

        const belumTerlaksana = await Proker.findAll({
            where: {
                status: 'belum terlaksana',
                id_dinas: dinas.id_dinas,
            }
        });

        const terlaksana = await Proker.findAll({
            where: {
                status: 'terlaksana',
                id_dinas: dinas.id_dinas,
            }
        });

        const proker = await Proker.findAll({
            where: {
                id_dinas: dinas.id_dinas,
            }
        });
        // get progress that related to proker
        const progress = await Progress.findAll({
            where: {
                id_proker: proker.map(proker => proker.id_proker)
            }
        });

        res.render('dinas/index', {berjalan, belumTerlaksana, terlaksana, progress});
    } catch (error) {
        console.error(error.message);
    }
}

const dashboardAdmin = async (req, res) => {
    try {
        const berjalan = await Proker.findAll({
            where: {
                status: 'berjalan'
            }
        });

        const belumTerlaksana = await Proker.findAll({
            where: {
                status: 'belum terlaksana'
            }
        });

        const terlaksana = await Proker.findAll({
            where: {
                status: 'terlaksana'
            }
        });

        const progress = await Progress.findAll();

        res.render('admin/dashboardAdmin', {
            berjalan: berjalan.length,  
            belumTerlaksana: belumTerlaksana.length, 
            terlaksana: terlaksana.length,  
            progress: progress.length  
        });
    } catch (error) {
        console.error(error.message);
    }
}


const hapusProker = async (req, res) => {
    const { id } = req.params;

    try {
        // Cari Proker berdasarkan ID
        const proker = await Proker.findByPk(id);
        if (!proker) {
            return res.status(404).json({
                success: false,
                message: 'Proker tidak ditemukan.'
            });
        }

        // Cari semua Progres yang terkait dengan Proker
        const progresList = await Progress.findAll({
            where: { id_proker: proker.id_proker }
        });

        // Loop untuk menghapus file yang terkait (jika ada)
        for (const progres of progresList) {
            if (progres.file_upload) {
                const oldFilePath = path.join(__dirname, '../public/images/', progres.file_upload);
                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.error(`Gagal menghapus file: ${progres.file_upload}`, err);
                    } else {
                        console.log(`File berhasil dihapus: ${progres.file_upload}`);
                    }
                });
            }
        }

        // Hapus semua Progres dari database
        await Progress.destroy({
            where: { id_proker: proker.id_proker }
        });

        // Hapus Proker setelah Progres terkait dihapus
        await Proker.destroy({
            where: { id_proker: proker.id_proker }
        });

        // Kirim respon berhasil
        let success = "Proker dan semua progres terkait berhasil dihapus.";
        res.cookie("success", success, {
            maxAge: 1000,
            httpOnly: true
        });
        res.redirect("/dinas/proker");
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat menghapus data."
        });
    }
};

module.exports = {
    index,
    view,
    create,
    store,
    edit,
    update,
    dashboard,
    dashboardAdmin,
    hapusProker
}