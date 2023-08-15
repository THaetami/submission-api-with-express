'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class msproduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      msproduk.belongsTo(models.mstypeproduk, {
        foreignKey: 'prd_typ_id',
        onDelete: 'CASCADE',
      });
      msproduk.hasMany(models.dtpenjualan, {
        foreignKey: 'djul_prd_id',
        onDelete: 'CASCADE',
      });
    }
  }
  msproduk.init({
    prd_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(5)
    },
    prd_nm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    prd_typ_id: {
      type: DataTypes.CHAR(3),
      references: {
        model:'mstypeproduks',
        key: 'typ_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    prd_aktif: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    prd_note: {
      type: DataTypes.STRING(1000)
    },
    prd_hargamodal: {
      type: DataTypes.DOUBLE
    },
    prd_stokawal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'msproduk',
    underscored: true,
    timestamps: false
  });
  return msproduk;
};