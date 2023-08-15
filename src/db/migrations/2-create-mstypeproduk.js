'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mstypeproduks', {
      typ_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(3)
      },
      typ_nm: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      typ_persenkomisi: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      typ_notes: {
        type: Sequelize.STRING(1000)
      },
      typ_aktif: {
        allowNull: false,
        type: Sequelize.CHAR(1)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mstypeproduks');
  }
};