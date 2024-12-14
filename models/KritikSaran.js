const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')
    const kritik_saran = sequelize.define('kritik_saran', {
      id_kritikdansaran: {
        type: DataTypes.CHAR(10),
        primaryKey: true,
      },
      id_progres: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      isi: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
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
      tableName: 'kritik_saran',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    });
  
module.exports=kritik_saran;
  