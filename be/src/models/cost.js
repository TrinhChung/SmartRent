"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    static associate(models) {
      Cost.hasOne(models.Contract, {
        foreignKey: {
          name: "costId",
        },
      });
    }
  }

  Cost.init(
    {
      value: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      accept: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cost",
      paranoid: false,
    }
  );

  return Cost;
};
