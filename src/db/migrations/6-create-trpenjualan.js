'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trpenjualans', {
      jul_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      jul_tanggaljual: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      jul_sal_id: {
        type: Sequelize.CHAR(4),
        references: {
          model: 'mssalesmans',
          key: 'sal_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jul_cus_id: {
        type: Sequelize.CHAR(4),
        references: {
          model: 'mscustomers',
          key: 'cus_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jul_notes: {
        type: Sequelize.STRING(100)
      },
      jul_tanggalbayar: {
        type: Sequelize.DATEONLY,
        comment: 'null jika belum bayar, terisi jika sudah bayar'
      },
      jul_batal: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        comment: 'N = tidak batal, Y = jika dibatalkan',
        defaultValue: 'N'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trpenjualans');
  }
};