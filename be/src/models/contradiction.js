"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contradiction extends Model {
    static associate(models) {}
  }
  Contradiction.init(
    {
      termId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Contradiction",
      paranoid: false,
      timestamps: true,
    }
  );
  return Contradiction;
};
