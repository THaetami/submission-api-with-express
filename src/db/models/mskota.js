'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mskota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mskota.hasMany(models.mssalesman, {
        foreignKey: 'sal_kta_id',
        onDelete: 'CASCADE',
      });
    }
  }
  mskota.init({
    kta_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(3)
    },
    kta_nm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kta_notes: {
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'mskota',
    timestamps: false,
    underscored: true,
  });
  return mskota;
};