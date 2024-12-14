'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  	id_anggota	nama_anggota	no_hp	alamat	createdAt	updatedAt	
    // ANG-001	Ahmad	08123456789	Jl. Kaliurang	2021-12-13 00:03:50	2021-12-13 00:03:50
    await queryInterface.bulkInsert('Anggota', [
      {
        id_anggota: 'ANG-001',
        nama_anggota: 'Ahmad',
        no_hp: '08123456789',
        alamat: 'Jl. Kaliurang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_anggota: 'ANG-002',
        nama_anggota: 'Budi',
        no_hp: '08123456788',
        alamat: 'Jl. Kaliurang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_anggota: 'ANG-003',
        nama_anggota: 'Cecep',
        no_hp: '08123456787',
        alamat: 'Jl. Kaliurang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Anggota', null, {});
  }
};
