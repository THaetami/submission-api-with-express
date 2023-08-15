'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mstypeproduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mstypeproduk.hasMany(models.msproduk, { 
        foreignKey: 'prd_typ_id',
        onDelete: 'CASCADE',
      });
    }
  }
  mstypeproduk.init({
    typ_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(3)
    },
    typ_nm: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    typ_persenkomisi: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    typ_notes: {
      type: DataTypes.STRING(1000)
    },
    typ_aktif: {
      allowNull: false,
      type: DataTypes.CHAR(1)
    }
  }, {
    sequelize,
    modelName: 'mstypeproduk',
    underscored: true,
    timestamps: false
  });
  return mstypeproduk;
};