const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')
const dinas = sequelize.define('dinas', {
  id_dinas: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  nama_dinas: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  nama_kadin: {
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
  tableName: 'dinas',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = dinas;