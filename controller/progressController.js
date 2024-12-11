const express = require('express');
const Progres = require('../models/Progres');
const Proker = require('../models/Proker');

const index = async (req, res) => {
    month = res.body ? res.body.month : new Date().getMonth() + 1;
    try {
        const progress = await Progres.findAll({
            include: {
                model: Proker,
                attributes: ['nama_proker'],
                as: 'dataProker',
            },
            // where: {
            //     waktu_pelaksanaan: month
            // }
        });
        res.render('dinas/progress/index', {progress, month});
    } catch (error) {
        console.error(error.message);
    }
}

// const getIdUser = async (req, res) => {
//     const token = req.cookies.token;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//     req.user = decoded;

//     return req.user.id;
// }

module.exports = {
    index
}