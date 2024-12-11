'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kritik_saran', {
      id_kritikdansaran: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: false,
      },
      id_progres: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      isi: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATE,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kritik_saran');
  }
};