"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Verify extends Model {
    static associate(models) {}
  }
  Verify.init(
    {
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      type: DataTypes.STRING,
      fk_id: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Verify",
      paranoid: false,
    }
  );
  return Verify;
};
