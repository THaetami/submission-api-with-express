'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dtpenjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dtpenjualan.belongsTo(models.mstypeproduk, {
        foreignKey: 'djul_prd_id',
        onDelete: 'CASCADE',
      });
      dtpenjualan.belongsTo(models.trpenjualan, { 
        foreignKey: 'djul_jul_id',
        onDelete: 'CASCADE',
      });
    }
  }
  dtpenjualan.init({
    djul_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    djul_jul_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'trpenjualans',
        key: 'jul_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    djul_prd_id: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      references: {
        model: 'msproduks',
        key: 'prd_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    djul_qtyjual: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    djul_hargasatuan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'dtpenjualan',
    underscored: true,
    timestamps: false,
  });
  return dtpenjualan;
};