const {
  DataTypes
} = require('sequelize')
const sequelize = require('../config/db')
    const user = sequelize.define('user', {
      id_user: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'dinas'),
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
      tableName: 'user',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    });
  
module.exports = user