"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExtraNotify extends Model {
    static associate(models) {}
  }
  ExtraNotify.init(
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExtraNotify",
      paranoid: false,
    }
  );

  return ExtraNotify;
};
