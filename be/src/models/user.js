"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      addressId: DataTypes.INTEGER.UNSIGNED,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: false,
    }
  );
  return User;
};
