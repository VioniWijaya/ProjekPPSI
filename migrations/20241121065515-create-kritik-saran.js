'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kritik_Saran', {
      id_kritiksaran: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
      isi: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kritik_Saran');
  },
};
