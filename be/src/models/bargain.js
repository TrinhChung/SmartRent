"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bargain extends Model {
    static associate(models) {}
  }
  Bargain.init(
    {
      realEstateId: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.STRING(1),
      renterId: DataTypes.INTEGER.UNSIGNED,
      sellerId: DataTypes.INTEGER.UNSIGNED,
      roomChatId: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Bargain",
      paranoid: false,
    }
  );

  return Bargain;
};
