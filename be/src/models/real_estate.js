"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RealEstate extends Model {
    static associate(models) {}
  }
  RealEstate.init(
    {
      name: DataTypes.STRING(200),
      userId: DataTypes.INTEGER.UNSIGNED,
      addressId: DataTypes.INTEGER.UNSIGNED,
      cost: DataTypes.FLOAT.UNSIGNED,
      descriptionHtml: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      acreage: DataTypes.FLOAT,
      floorTotal: DataTypes.INTEGER.UNSIGNED,
      roomTotal: DataTypes.INTEGER.UNSIGNED,
      isElevator: DataTypes.BOOLEAN,
      isPet: DataTypes.BOOLEAN,
      status: DataTypes.STRING(1),
    },
    {
      sequelize,
      modelName: "RealEstate",
      paranoid: false,
    }
  );

  return RealEstate;
};
