const express = require('express');
const User = require('../models/User');
const Dinas = require('../models/Dinas');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const profile = async (req, res) => {
    try {
        const id_user = await getIdUser(req, res);
        const dinas = await Dinas.findOne({
            where: {
                id_user
            },
            include: {
                model: User,
                attributes: ['username', 'role', 'password'],
                as: 'dataUser'
            }
        });
        res.render('profile', {dinas});
    } catch (error) {
        console.error(error.message);
    }
}

const updateProfile = async (req, res) => {
    try {
        const { username, dinas, deskripsi, nama_kadin, password, } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const id_user = await getIdUser(req, res);
        await User.update({
            username,
            password: hashPassword
        }, {
            where: {
                id_user
            }
        });

        await Dinas.update({
            nama_dinas: dinas,
            deskripsi,
            nama_kadin
        }, {
            where: {
                id_user
            }
        });
        res.redirect('/dinas/profile');
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

module.exports = {
    profile,
    updateProfile
}