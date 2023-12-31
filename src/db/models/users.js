'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already exists'
      }
    },
    password: DataTypes.STRING,
    expried_token: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
  });
  return users;
};