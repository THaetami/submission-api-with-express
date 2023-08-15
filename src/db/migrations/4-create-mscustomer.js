'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mscustomers', {
      cus_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(4)
      },
      cus_nm: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cus_tanggallahir: {
        type: Sequelize.DATEONLY
      },
      cus_kta_id: {
        type: Sequelize.CHAR(3),
        references: {
          model: 'mskota',
          key: 'kta_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cus_aktif: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: 'Y'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mscustomers');
  }
};