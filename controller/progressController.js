const express = require('express');
const { Progres } = require('../models');
const { Proker } = require('../models');

const index = async (req, res) => {
    month = res.body ? res.body.month : new Date().getMonth() + 1;
    try {
        const progress = await Progres.findAll({
            include: {
                model: Proker,
                attributes: ['nama_proker']
            }
        });
        res.render('progress/index', {progress, month});
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    index
}