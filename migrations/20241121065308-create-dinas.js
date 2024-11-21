'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dinas', {
      id_dinas: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: 'User',
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama_dinas: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      nama_kadin: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Dinas');
  },
};
