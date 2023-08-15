'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mscustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mscustomer.belongsTo(models.mskota, { 
        foreignKey: 'cus_kta_id',
        onDelete: 'CASCADE',
      });
      mscustomer.hasMany(models.trpenjualan, { 
        foreignKey: 'jul_cus_id',
        onDelete: 'CASCADE',
      });
    }
  }
  mscustomer.init({
    cus_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(4)
    },
    cus_nm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cus_tanggallahir: {
      type: DataTypes.DATEONLY
    },
    cus_kta_id: {
      type: DataTypes.CHAR(3),
      references: {
        model: 'mskota',
        key: 'kta_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    cus_aktif: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    }
  }, {
    sequelize,
    modelName: 'mscustomer',
    underscored: true,
    timestamps: false
  });
  return mscustomer;
};