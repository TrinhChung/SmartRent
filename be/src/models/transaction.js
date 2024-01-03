"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {}
  }
  Room.init(
    {
      contractId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      acreage: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Room",
      paranoid: false,
    }
  );

  return Room;
};
