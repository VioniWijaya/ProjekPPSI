module.exports = (sequelize, DataTypes) => {
    const Proker = sequelize.define('Proker', {
      id_proker: {
        type: DataTypes.CHAR(10),
        primaryKey: true,
      },
      id_dinas: {
        type: DataTypes.CHAR(10),
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
    }, {
      tableName: 'Proker',
      timestamps: false,
    });
  
    return Proker;
  };
  