const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')
    const progres = sequelize.define('progres', {
      id_progres: {
        type: DataTypes.CHAR(10),
        primaryKey: true,
      },
      id_proker: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      waktu_pelaksanaan: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      kendala: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      jumlah_pelaksanaan: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      target: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      revisi: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      file_upload: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      tableName: 'progres',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    });
  
module.exports= progres;
  