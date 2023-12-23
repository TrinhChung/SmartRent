"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {}
  }
  Room.init(
    {
      contractId: DataTypes.INTEGER.UNSIGNED,
      acreage: DataTypes.FLOAT.UNSIGNED,
      cost: DataTypes.FLOAT.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Room",
      paranoid: false,
    }
  );

  return Room;
};
