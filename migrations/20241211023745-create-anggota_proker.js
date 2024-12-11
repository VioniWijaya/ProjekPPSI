module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anggota_proker', {
      id_anggota: {
        type: Sequelize.STRING(10),
        primaryKey: true,
      },
      id_proker: {
        type: Sequelize.STRING(10),
        primaryKey: true,
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
    await queryInterface.dropTable('anggota_proker');
  },
};
