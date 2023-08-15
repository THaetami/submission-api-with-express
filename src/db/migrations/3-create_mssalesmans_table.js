'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mssalesmans', {
      sal_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(4)
      },
      sal_nm: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      sal_bekerjasejak: {
        type: Sequelize.DATEONLY
      },
      sal_aktif: {
        type: Sequelize.CHAR(1),
        defaultValue: 'Y'
      },
      sal_kta_id: {
        type: Sequelize.CHAR(3),
        references: {
          model: 'mskota',
          key: 'kta_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mssalesmans');
  }
};
