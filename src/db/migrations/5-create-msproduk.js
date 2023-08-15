'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('msproduks', {
      prd_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(5)
      },
      prd_nm: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      prd_typ_id: {
        type: Sequelize.CHAR(3),
        references: {
          model:'mstypeproduks',
          key: 'typ_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      prd_aktif: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: 'Y'
      },
      prd_note: {
        type: Sequelize.STRING(1000)
      },
      prd_hargamodal: {
        type: Sequelize.DOUBLE
      },
      prd_stokawal: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('msproduks');
  }
};