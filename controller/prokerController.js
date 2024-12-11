const express = require('express');
const Proker = require('../models/Proker');

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
        anggaran,
    } = req.body;
    try {
        // save proker to database
        let randProkerId = Math.random().toString(36).substring(7);
        const proker = await Proker.create({
            id_proker: randProkerId, // temporary id_proker
            nama_proker,
            // id_dinas: req.session.user.id_dinas, // TODO: id dinas can be added to the session
            id_dinas: 'D001', // temporary id_dinas
            pj_proker,
            kegiatan,
            tujuan,
            sasaran,
            target_waktu,
            tempat,
            anggaran,
        });

        if (!proker) {
            return res.redirect('/proker/create');
        }else{
            return res.redirect('/proker');
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
            anggaran,
        }, {
            where: {
                id_proker: req.params.id
            }
        });

        if (!proker) {
            return res.redirect('/proker/edit/' + req.params.id);
        }else{
            return res.redirect('/proker');
        }
    } catch (error) {
        console.error(error.message);
    }
}

// const dashboard = async (req, res) => {

module.exports = {
    index,
    view,
    create,
    store,
    edit,
    update
}