'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dtpenjualans', {
      djul_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      djul_jul_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'trpenjualans',
          key: 'jul_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      djul_prd_id: {
        type: Sequelize.CHAR(5),
        allowNull: false,
        references: {
          model: 'msproduks',
          key: 'prd_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      djul_qtyjual: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      djul_hargasatuan: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dtpenjualans');
  }
};