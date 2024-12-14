const response = require('express')
require('dotenv').config()
require('../models/relasi')
const modelUser = require('../models/User')
const modelDinas = require('../models/Dinas')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    Op
} = require('sequelize')

const tambahDinas = async (req, res) => {
    try {
        const {
            username,
            nama_dinas,
            deskripsi,
            nama_kadin,
            password
        } = req.body;

        // Validasi input
        if (!nama_dinas || !username || !deskripsi || !nama_kadin || !password) {
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi.'
            });
        }
        const findDinas = await modelDinas.findOne({
            where: {
                nama_dinas
            }
        })
        const findUsername = await modelUser.findOne({
            where: {
                username
            }
        })
        if (findDinas) {
            return res.status(400).json({
                success: false,
                message: 'Dinas Sudah Ada'
            })
        }
        if (findUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username Sudah Ada'
            })
        }
        // Generate ID User
        const generateIdUser = () => {
            const prefix = 'US';
            const timestampPart = Date.now().toString().slice(-8);
            return `${prefix}${timestampPart}`;
        };

        // Generate ID Dinas
        const generateIdDinas = () => {
            const prefix = 'DIN';
            const namePart = nama_dinas.substring(0, 3).toUpperCase();
            const timestampPart = Date.now().toString().slice(-4);
            return `${prefix}${namePart}${timestampPart}`;
        };

        const id_dinas = generateIdDinas();
        const id_user = generateIdUser();

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tambah data User
        const tambahUser = await modelUser.create({
            id_user: id_user,
            username: username,
            password: hashedPassword,
            role: 'dinas'
        });

        if (!tambahUser) {
            return res.status(400).json({
                success: false,
                message: 'Gagal menambahkan user.'
            });
        }

        // Tambah data Dinas
        const tambahDinas = await modelDinas.create({
            id_dinas,
            id_user,
            nama_dinas,
            deskripsi,
            nama_kadin
        });

        if (tambahDinas) {
            return res.status(200).redirect('/admin/lihatDinas')
        } else {
            return res.status(400).alert('gagal')
        }

    } catch (error) {
        console.error('Error saat menambahkan dinas:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
};

const lihatDinas = async (req, res) => {
    const dinas = await modelDinas.findAll({
        include: [{
            model: modelUser,
            as: 'dataUser'
        }]
    })


    res.render('admin/lihatDinas', {
        dinas,
        page: 'Lihat Dinas',
        success: req.cookies.success,
        error: req.cookies.error,
    });
}

const editDinas = async (req, res) => {
    const {
        id
    } = req.params;
    const dinas = await modelDinas.findByPk(id, {
        include: [{
            model: modelUser,
            as: 'dataUser'
        }]
    });
    res.render("admin/editDinas", {
        dinas,
        page: "Edit Mata Kuliah",
    });
}

const updateDinas = async (req, res) => {
    try {
        const {
            id
        } = req.params; // Mendapatkan ID dari URL parameter
        const {
            nama_dinas,
            username,
            deskripsi,
            nama_kadin
        } = req.body;
        console.log(nama_dinas, username, deskripsi, nama_kadin, "assaas");

        // Validasi input
        if (!nama_dinas || !username || !deskripsi || !nama_kadin) {
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi.'
            });
        }

        // Cari dinas berdasarkan ID
        const dinas = await modelDinas.findByPk(id, {
            include: [{
                model: modelUser,
                as: 'dataUser'
            }]
        });

        if (!dinas) {
            return res.status(404).json({
                success: false,
                message: 'Dinas tidak ditemukan.'
            });
        }

        // Update data User jika username diubah
        if (username !== dinas.dataUser.username) {
            const findUsername = await modelUser.findOne({
                where: {
                    username
                }
            });

            if (findUsername) {
                return res.status(400).json({
                    success: false,
                    message: 'Username sudah ada.'
                });
            }

            // Update username
            await modelUser.update({
                username
            }, {
                where: {
                    id_user: dinas.id_user
                }
            });
        }

        // Update data Dinas
        await modelDinas.update({
            nama_dinas,
            deskripsi,
            nama_kadin
        }, {
            where: {
                id_dinas: id
            }
        });

        return res.status(200).redirect('/admin/lihatDinas');

    } catch (error) {
        console.error('Error saat mengupdate dinas:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
};

const hapusDinas = async (req, res) => {
    const {
        id
    } = req.params;

    const dinas = await modelDinas.findByPk(id);
    if (!dinas) {
        return res.status(404).json({
            success: false,
            message: 'Dinas tidak ditemukan.'
        });
    }

    // Hapus data User yang terkait dengan Dinas
    await modelUser.destroy({
        where: {
            id_user: dinas.id_user
        }
    });

    // Hapus data Dinas
    await modelDinas.destroy({
        where: {
            id_dinas: id
        }
    });

    let success = "Dinas Berhasil Di Hapus";
    res.cookie("success", success, {
        maxAge: 1000,
        httpOnly: true
    });
    res.redirect("/admin/lihatDinas");
}

const viewResetPassword = async(req,res)=>{
    try {
        const{
            id
        }= req.params
        const dinas = await modelDinas.findByPk(id)
        res.render('admin/editPasswordDinas', {
            dinas,
            page: 'Reset Password',
            success: req.cookies.success,
            error: req.cookies.error,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        console.log("tes ini dia");
        
        const {
            id
        } = req.params
        const {
            password,
            confirmPassword
        } = req.body;
        const dinas = await modelDinas.findByPk(id)
        if (!dinas) {
            return res.status(404).json({
                success: false,
                message: 'Dinas Tidak Ditemukan'
            })
        }
        if (password != confirmPassword) {
            let error = "Harap isi password dan confirmPasswordnya sama";
            res.cookie("error", error, {
                maxAge: 1000,
                httpOnly: true
            });
            return res.status(400).redirect(`/admin/changePass/${dinas.id_dinas}`)
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        
        const updatePass = await modelUser.update({
            password: hashedPassword
        },{
            where:{
                id_user: dinas.id_user
            }
        })
        if (updatePass) {
            let success = "Password Telah Diperbarui";
            res.cookie("success", success, {
                maxAge: 1000,
                httpOnly: true
            });
            return res.status(200).redirect('/admin/lihatDinas')
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
module.exports = {
    tambahDinas,
    lihatDinas,
    editDinas,
    updateDinas,
    hapusDinas,
    viewResetPassword,
    resetPassword
};