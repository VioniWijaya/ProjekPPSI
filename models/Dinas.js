module.exports = (sequelize, DataTypes) => {
    const Dinas = sequelize.define('Dinas', {
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
    }, {
      tableName: 'Dinas',
      timestamps: false,
    });
  
    return Dinas;
  };
  