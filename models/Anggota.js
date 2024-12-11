const {
    DataTypes
} = require('sequelize')
const sequelize = require('../config/config')
const anggota = sequelize.define('anggota', {
    id_anggota: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    nama_anggota: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    no_hp: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'anggota',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = anggota;