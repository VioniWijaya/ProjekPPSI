const express = require('express');
const Proker = require('../models/Proker');
const Dinas = require('../models/Dinas');
const Progress = require('../models/Progres');
const jwt = require('jsonwebtoken');

const index = async (req, res) => {
    try {
        const proker = await Proker.findAll();
        res.render('dinas/proker/index', {proker});
        // res.render('dinas/proker/index');
    } catch (error) {
        console.error(error.message);
    }
}

const view = async (req, res) => {
    try {
        const proker = await Proker.findOne({
            where: {
                id_proker: req.params.id
            }
        });
        res.render('dinas/proker/view', {proker});
    } catch (error) {
        console.error(error.message);
    }
}

const create = async (req, res) => {
    try {
        res.render('dinas/proker/create');
    } catch (error) {
        console.error(error.message);
    }
}

const store = async (req, res) => {
    const {
        nama_proker,
        pj_proker,
        kegiatan,
        tujuan,
        sasaran,
        target_waktu,
        tempat,
        status,
        anggaran,
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
            pj_proker,
            kegiatan,
            tujuan,
            sasaran,
            target_waktu,
            tempat,
            status,
            anggaran,
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
        const proker = await Proker.findOne({
            where: {
                id_proker: req.params.id
            }
        });
        res.render('dinas/proker/edit', {proker});
    } catch (error) {
        console.error(error.message);
    }
}

const update = async (req, res) => {
    const {
        nama_proker,
        pj_proker,
        kegiatan,
        tujuan,
        sasaran,
        target_waktu,
        tempat,
        status,
        anggaran,
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

        res.render('dinas/index', {berjalan, belumTerlaksana, terlaksana, progress});
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    index,
    view,
    create,
    store,
    edit,
    update,
    dashboard
}