const response = require('express')
require('dotenv').config()
require('../models/relasi')
const modelUser = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    Op
} = require('sequelize')

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        console.log("iniloh", username, password);

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Lengkapi data akun anda'
            })
        }

        const user = await modelUser.findOne({
            where: {
                username: username
            }
        });
        console.log("user.password", user.password);
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Username tidak ditemukan'
            })

        }


        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            console.log("pass salah");
            
            const message = [{
                msg: 'username atau password salah'
            }];
            res.cookie("pesan", message, {
                maxAge: 1000,
                httpOnly: true
            });
            return res.redirect("/login");
        }

        const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET_TOKEN, {
                expiresIn: '15h'
            }
        );

        const refreshToken = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET_REFRESH_TOKEN, {
                expiresIn: '1d'
            }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("token", token, {
            httpOnly: true
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        });

        res.redirect(getRedirectUrl(user.role));
    } catch (err) {
        console.error("Error during login: ", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

function getRedirectUrl(role) {
    switch (role) {
        case "admin":
            return "/admin/lihatDinas";
        case "dinas":
            return "/dinas/layout/dashboard";
        default:
            return "/";
    }
}

const logout = async (req, res) => {
    try {
        // Hapus cookie token dan refreshToken
        res.clearCookie("token", { httpOnly: true });
        res.clearCookie("refreshToken", { httpOnly: true });

        // Hapus sesi pengguna jika menggunakan sesi
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Logout gagal, coba lagi nanti"
                    });
                }
            });
        }

        // Redirect ke halaman login setelah logout
        res.redirect("/login");
    } catch (err) {
        console.error("Error during logout: ", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    login,
    logout
}
