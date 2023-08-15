'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class mssalesman extends Model {
    static associate(models) {
      mssalesman.belongsTo(models.mskota, {
        foreignKey: 'sal_kta_id',
        as: 'kota', 
        onDelete: 'CASCADE',
      });
    }
  }

  mssalesman.init(
    {
      sal_id: {
        type: DataTypes.STRING(4), // Ubah ke STRING(4)
        primaryKey: true,
        allowNull: false,
      },
      sal_nm: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      sal_bekerjasejak: {
        type: DataTypes.DATEONLY,
      },
      sal_aktif: {
        type: DataTypes.CHAR(1),
        defaultValue: 'Y'
      },
      sal_kta_id: {
        type: DataTypes.CHAR(3),
        references: {
          model: 'mskota',
          key: 'kta_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'mssalesman',
      underscored: true,
      timestamps: false,
    }
  );

  return mssalesman;
};
