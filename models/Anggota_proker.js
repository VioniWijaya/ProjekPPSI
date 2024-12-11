const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')

const anggota_proker = sequelize.define('anggota_proker', {
  id_anggota: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  id_proker: {
    type: DataTypes.STRING(10),
    primaryKey: true,
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
  tableName: 'anggota_proker',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports= anggota_proker;