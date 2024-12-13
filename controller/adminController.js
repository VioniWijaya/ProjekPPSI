const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const profile = async (req, res) => {
    try {
        // Ambil token dari cookies
        const token = req.cookies.token;
        
        // Decode token untuk mendapatkan id user
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const id_user = decoded.id;

        // Cari user berdasarkan ID
        const userData = await User.findOne({
            where: {
                id_user: id_user
            },
            attributes: ['id_user', 'username'] // Pilih atribut yang ingin ditampilkan
        });

        // Jika user tidak ditemukan
        if (!userData) {
            return res.status(404).send('User tidak ditemukan');
        }

        // Render halaman dengan data user
        res.render('admin/profile', { 
            user: userData 
        });
    } catch (error) {
        console.error('Error pada profile controller:', error);
        res.status(500).send('Terjadi kesalahan server');
    }
}

const updateProfile = async (req, res) => {
    try {
        // Ambil token dari cookies
        const token = req.cookies.token;
        
        // Decode token untuk mendapatkan id user
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const id_user = decoded.id;

        const { username, password } = req.body;

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Update user
        await User.update({
            username,
            password: hashPassword
        }, {
            where: {
                id_user
            }
        });

        // Redirect setelah update
        res.redirect('/admin/profile');
    } catch (error) {
        console.error('Error pada update profile:', error);
        res.status(500).send('Terjadi kesalahan server');
    }
}

module.exports = {
    profile,
    updateProfile
}