'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifikasi', {
      id_notifikasi: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
      id_kritiksaran: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: 'Kritik_Saran',
          key: 'id_kritiksaran',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      judul: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifikasi');
  },
};
