const express = require('express');

const index = async (req, res) => {
    try {
        res.render('proker/index');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    index
}