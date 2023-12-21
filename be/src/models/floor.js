"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    static associate(models) {}
  }
  Floor.init(
    {
      name: DataTypes.STRING(200),
      realEstateId: DataTypes.INTEGER.UNSIGNED,
      cost: DataTypes.FLOAT.UNSIGNED,
      roomTotal: DataTypes.INTEGER.UNSIGNED,
      name: DataTypes.STRING(200),
      status: DataTypes.STRING(1),
    },
    {
      sequelize,
      modelName: "Floor",
      paranoid: false,
    }
  );

  return Floor;
};
