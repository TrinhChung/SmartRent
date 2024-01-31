"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {
    static associate(models) {
      RoomChat.hasMany(models.Message, {
        foreignKey: "roomChatId",
        as: "messages",
      });
      RoomChat.belongsTo(models.Bargain, {
        foreignKey: { name: "bargainId" },
        as: "bargain",
      });
    }
  }
  RoomChat.init(
    {
      bargainId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
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
