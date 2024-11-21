module.exports = (sequelize, DataTypes) => {
    const Progres = sequelize.define('Progres', {
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
    }, {
      tableName: 'Progres',
      timestamps: false,
    });
  
    return Progres;
  };
  