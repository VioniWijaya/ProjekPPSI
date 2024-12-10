const express = require('express');
const { User } = require('../models');
const { Dinas } = require('../models');

const bcrypt = require('bcrypt');

const profile = async (req, res) => {
    try {
        const dinas = await Dinas.findOne({
            where: {
                // id_user: req.session.user.id_user // TODO: change back to this
                id_user: 'U001' // this is temporary
            },
            include: {
                model: User,
                attributes: ['username', 'role', 'password']
            }
        });
        res.render('profile', {dinas});
    } catch (error) {
        console.error(error.message);
    }
}

const updateProfile = async (req, res) => {
    try {
        const { username, dinas, role, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.update({
            username,
            role,
            password: hashPassword
        }, {
            where: {
                // id_user: req.session.user.id_user // TODO: change back to this
                id_user: 'U001' // this is temporary
            }
        });

        await Dinas.update({
            nama_dinas: dinas
        }, {
            where: {
                // id_user: req.session.user.id_user // TODO: change back to this
                id_user: 'U001' // this is temporary
            }
        });
        res.redirect('/user/profile');
    } catch (error) {
        console.error(error.message);
    }
}



module.exports = {
    profile,
    updateProfile
}