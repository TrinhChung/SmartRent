"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExtraNotify extends Model {
    static associate(models) {}
  }
  ExtraNotify.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      userId: DataTypes.INTEGER.UNSIGNED,
      type: DataTypes.STRING(1),
    },
    {
      sequelize,
      modelName: "ExtraNotify",
      paranoid: false,
    }
  );

  return ExtraNotify;
};
