const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')
    const notifikasi = sequelize.define('notifikasi', {
      id_notifikasi: {
        type: DataTypes.CHAR(10),
        primaryKey: true,
      },
      id_kritikdansaran: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      id_dinas: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      judul: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type:  DataTypes.ENUM('admin', 'dinas'),
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
      tableName: 'notifikasi',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    });
  
module.exports= notifikasi;