'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Progres', {
      id_progres: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
      id_proker: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: 'Proker',
          key: 'id_proker',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Progres');
  },
};
