"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {}
  }
  Room.init(
    {
      floorId: DataTypes.INTEGER.UNSIGNED,
      acreage: DataTypes.FLOAT.UNSIGNED,
      type: DataTypes.STRING(1),
      name: DataTypes.STRING(200),
      cost: DataTypes.FLOAT.UNSIGNED,
      status: DataTypes.STRING(1),
    },
    {
      sequelize,
      modelName: "Room",
      paranoid: false,
    }
  );

  return Room;
};
