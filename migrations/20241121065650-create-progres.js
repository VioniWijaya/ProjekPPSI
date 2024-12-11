'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('progres', {
      id_progres: {
        type: Sequelize.CHAR(10),
        primaryKey: true,
        allowNull: false,
      },
      id_proker: {
        type: Sequelize.CHAR(10),
        allowNull: false,
      },
      waktu_pelaksanaan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      kendala: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      jumlah_pelaksanaan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      target: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      revisi: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      file_upload: {
        type: Sequelize.STRING(255),
        allowNull: true,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('progres');
  }
};
