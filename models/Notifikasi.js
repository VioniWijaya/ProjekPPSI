module.exports = (sequelize, DataTypes) => {
    const Notifikasi = sequelize.define('Notifikasi', {
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
    }, {
      tableName: 'Notifikasi',
      timestamps: false,
    });
  
    return Notifikasi;
  };
  