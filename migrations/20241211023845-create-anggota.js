module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anggota', {
      id_anggota: {
        type: Sequelize.STRING(10),
        primaryKey: true,
      },
      nama_anggota: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      no_hp: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      alamat: {
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
    await queryInterface.dropTable('anggota');
  },
};
