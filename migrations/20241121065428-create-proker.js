'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proker', {
      id_proker: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
      id_dinas: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: 'Dinas',
          key: 'id_dinas',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama_proker: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      pi_proker: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
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
        type: Sequelize.STRING(50),
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proker');
  },
};
