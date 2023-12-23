"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {
    static associate(models) {}
  }
  RoomChat.init(
    {
      bargainId: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: "RoomChat",
      paranoid: false,
    }
  );

  return RoomChat;
};
