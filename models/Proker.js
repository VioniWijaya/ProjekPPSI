const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')
const proker = sequelize.define('proker', {
    id_proker: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    id_dinas: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nama_proker: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    pj_proker: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    kegiatan: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    tujuan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sasaran: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    target_waktu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tempat: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    anggaran: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('belum terlaksana', 'berjalan', 'terlaksana'),
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
    tableName: 'proker',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  module.exports = proker