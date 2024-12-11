module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dinas', {
      id_dinas: {
        type: Sequelize.STRING(10),
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.STRING(10),
        allowNull: false,
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
    await queryInterface.dropTable('dinas');
  },
};
