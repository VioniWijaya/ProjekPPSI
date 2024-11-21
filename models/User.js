module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id_user: {
        type: DataTypes.CHAR(10),
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
    }, {
      tableName: 'User',
      timestamps: false,
    });
  
    return User;
  };
  