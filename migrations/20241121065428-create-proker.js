module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('proker', {
      id_proker: {
        type: Sequelize.STRING(10),
        primaryKey: true,
      },
      id_dinas: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nama_proker: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      // pj_proker: {
      //   type: Sequelize.STRING(100),
      //   allowNull: false,
      // },
      kegiatan: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      tujuan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      sasaran: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      target_waktu: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tempat: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      anggaran: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('belum terlaksana', 'berjalan', 'terlaksana'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('proker');
  },
};
