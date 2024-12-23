const express = require('express');
const Proker = require('../models/Proker');
const Dinas = require('../models/Dinas');
const Progress = require('../models/Progres');
const Anggota = require('../models/Anggota');
const Anggota_Proker = require('../models/Anggota_proker');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const { Op, fn, col, where } = require('sequelize'); // Pastikan `where` diimpor jika belum


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
    const month = req.query.month || new Date().getMonth() + 1; // Default ke bulan sekarang jika tidak ada bulan
    const year = req.query.year || new Date().getFullYear(); // Default ke tahun sekarang jika tidak ada tahun

    try {
        console.log('Filter Params:', { year, month }); // Log parameter filter

        // Mengambil Progres dengan filter berdasarkan bulan dan tahun
        const proker = await Proker.findAll({
        });
      

        res.render('dinas/proker/index', { proker, month, year }); // Kirim data `year` ke view jika dibutuhkan
    } catch (error) {
        console.error('Error fetching Progres:', error.message); // Log error
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
};




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

        // Tambahkan variabel errors
        const errors = {}; // Default kosong, diisi jika ada validasi nanti

        res.render('dinas/proker/create', { anggota, errors });
    } catch (error) {
        console.error(error.message);
    }
};


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
        // Validasi input kosong
        const errors = {};
        if (!nama_proker) errors.nama_proker = 'Nama proker tidak boleh kosong.';
        if (!kegiatan) errors.kegiatan = 'Kegiatan tidak boleh kosong.';
        if (!tujuan) errors.tujuan = 'Tujuan tidak boleh kosong.';
        if (!sasaran) errors.sasaran = 'Sasaran tidak boleh kosong.';
        if (!target_waktu) errors.target_waktu = 'Target waktu tidak boleh kosong.';
        if (!tempat) errors.tempat = 'Tempat tidak boleh kosong.';
        if (!status) errors.status = 'Status tidak boleh kosong.';
        if (!anggaran) errors.anggaran = 'Anggaran tidak boleh kosong.';
        if (!anggota || anggota.length === 0) errors.anggota = 'Anggota tidak boleh kosong.';

        if (Object.keys(errors).length > 0) {
            const anggotaList = await Anggota.findAll(); // Fetch anggota list again
            return res.render('dinas/proker/create', {
                errors,
                anggota: anggotaList,
                formData: req.body // Mengirim kembali data yang diisi
            });
        }

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
        if (!Array.isArray(anggota)) {
            anggota = [anggota]; // Convert single anggota to array
        }

        await Promise.all(anggota.map(async (id_anggota) => {
            await Anggota_Proker.create({
                id_proker: proker.id_proker,
                id_anggota,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }));

        if (!proker) {
            return res.redirect('/dinas/proker/create');
        } else {
            return res.redirect('/dinas/proker');
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
};


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
        const errors = {}; // Default kosong, diisi jika ada validasi nanti

        res.render('dinas/proker/edit', {anggota,proker,errors});
    } catch (error) {
        console.error(error.message);
    }
}

const update = async (req, res) => {
    try {
        const {
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

        // Validasi input kosong
        const errors = {};
        if (!nama_proker) errors.nama_proker = 'Nama proker tidak boleh kosong.';
        if (!kegiatan) errors.kegiatan = 'Kegiatan tidak boleh kosong.';
        if (!tujuan) errors.tujuan = 'Tujuan tidak boleh kosong.';
        if (!sasaran) errors.sasaran = 'Sasaran tidak boleh kosong.';
        if (!target_waktu) errors.target_waktu = 'Target waktu tidak boleh kosong.';
        if (!tempat) errors.tempat = 'Tempat tidak boleh kosong.';
        if (!status) errors.status = 'Status tidak boleh kosong.';
        if (!anggaran) errors.anggaran = 'Anggaran tidak boleh kosong.';
        if (!anggota || anggota.length === 0) errors.anggota = 'Anggota tidak boleh kosong.';

        if (Object.keys(errors).length > 0) {
            const anggotaList = await Anggota.findAll(); // Fetch anggota list again
            const proker = await Proker.findOne({
                where: { id_proker: req.params.id },
                include: {
                    model: Anggota,
                    as: 'dataAnggota'
                }
            });

            return res.render('dinas/proker/edit', { anggota: anggotaList, proker, errors });
        }

        // Update proker
        const proker = await Proker.update({
            nama_proker,
            kegiatan,
            tujuan,
            sasaran,
            target_waktu,
            tempat,
            status,
            anggaran,
        }, {
            where: { id_proker: req.params.id }
        });

        // Update anggota proker
        await Anggota_Proker.destroy({ where: { id_proker: req.params.id } });
        await Promise.all(anggota.map(async (id_anggota) => {
            await Anggota_Proker.create({
                id_proker: req.params.id,
                id_anggota,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }));

        return res.redirect('/dinas/proker');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
};


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
        // get Progres that related to proker
        const progress  = await Progress.findAll({
            where: {
                id_proker: proker.map(proker => proker.id_proker)
            }
        });

        res.render('dinas/index', {berjalan, belumTerlaksana, terlaksana, progress });
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

        const Progres = await Progres.findAll();

        res.render('admin/dashboardAdmin', {
            berjalan: berjalan.length,  
            belumTerlaksana: belumTerlaksana.length, 
            terlaksana: terlaksana.length,  
            Progres: Progres.length  
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
        const progresList = await Progres.findAll({
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
        await Progres.destroy({
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