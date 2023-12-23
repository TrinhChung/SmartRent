"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {
    static associate(models) {}
  }
  RoomChat.init(
    {
      bargainId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RoomChat",
      paranoid: false,
    }
  );

  return RoomChat;
};
