'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trpenjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  trpenjualan.init({
    jul_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    jul_tanggaljual: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    jul_sal_id: {
      type: DataTypes.CHAR(4),
      references: {
        model: 'mssalesmans',
        key: 'sal_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    jul_cus_id: {
      type: DataTypes.CHAR(4),
      references: {
        model: 'mscustomers',
        key: 'cus_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    jul_notes: {
      type: DataTypes.STRING(100)
    },
    jul_tanggalbayar: {
      type: DataTypes.DATEONLY,
      comment: 'null jika belum bayar, terisi jika sudah bayar'
    },
    jul_batal: {
      allowNull: false,
      type: DataTypes.CHAR(1),
      comment: 'N = tidak batal, Y = jika dibatalkan',
      defaultValue: 'N'
    }
  }, {
    sequelize,
    modelName: 'trpenjualan',
    underscored: true,
    timestamps: false
  });
  return trpenjualan;
};