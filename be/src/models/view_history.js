"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ViewHistory extends Model {
    static associate(models) {}
  }
  ViewHistory.init(
    {
      realEstateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      viewCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ViewHistory",
      paranoid: false,
      timestamps: true,
    }
  );
  return ViewHistory;
};
