"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeStart extends Model {
    static associate(models) {
      TimeStart.hasOne(models.Contract, {
        foreignKey: {
          name: "timeStartId",
        },
      });
    }
  }
  TimeStart.init(
    {
      value: {
        type: DataTypes.DATE,
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
      modelName: "TimeStart",
      paranoid: false,
    }
  );

  return TimeStart;
};
