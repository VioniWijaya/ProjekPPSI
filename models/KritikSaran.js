module.exports = (sequelize, DataTypes) => {
    const KritikSaran = sequelize.define('KritikSaran', {
      id_kritikdansaran: {
        type: DataTypes.CHAR(10),
        primaryKey: true,
      },
      isi: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      tableName: 'KritikSaran',
      timestamps: false,
    });
  
    return KritikSaran;
  };
  