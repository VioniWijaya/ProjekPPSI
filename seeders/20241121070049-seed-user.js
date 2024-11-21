'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        id_user: 'U001',
        username: 'admin_user',
        password: await bcrypt.hash("admin01", 10),
        role: 'admin',
      },
      {
        id_user: 'U002',
        username: 'dinasristek',
        password: await bcrypt.hash("ristek", 10),
        role: 'dinas',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
