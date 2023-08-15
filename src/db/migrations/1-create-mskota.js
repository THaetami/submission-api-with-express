'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mskota', {
      kta_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(3)
      },
      kta_nm: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      kta_notes: {
        type: Sequelize.STRING(100)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mskota');
  }
};
