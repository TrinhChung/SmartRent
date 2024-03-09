"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {
    static associate(models) {
      RoomChat.hasMany(models.Message, {
        foreignKey: "roomChatId",
        as: "messages",
      });
      RoomChat.belongsTo(models.Contract, {
        foreignKey: { name: "contractId" },
        as: "contract",
      });
    }
  }
  RoomChat.init(
    {
      contractId: {
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
