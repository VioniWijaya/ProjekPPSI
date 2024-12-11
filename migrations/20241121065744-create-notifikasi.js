'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifikasi', {
      id_notifikasi: {
        type: Sequelize.CHAR(10),
        primaryKey: true,
        allowNull: false,
      },
      id_kritikdansaran: {
        type: Sequelize.CHAR(10),
        allowNull: false,
      },
      id_dinas: {
        type: Sequelize.CHAR(10),
        allowNull: false,
      },
      judul: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('admin', 'dinas'),
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
    await queryInterface.dropTable('notifikasi');
  }
};
