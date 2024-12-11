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
                as: 'dataProker'
            }
        });
        res.render('dinas/progress/index', {progress, month});
    } catch (error) {
        console.error(error.message);
    }
}

const upload = async (req, res) => {
    try {
        res.render('dinas/progress/upload');
    } catch (error) {
        console.error(error.message);
    }
}
const allProgress = async (req, res) => {
    try {
        res.render('dinas/progress/allProgress');
    } catch (error) {
        console.error(error.message);
    }
}


module.exports = {
    index,
    upload,
    allProgress
}