"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.RoomChat);

      Message.hasMany(models.Message, {
        foreignKey: {
          name: "replyId",
          as: "children",
        },
      });

      Message.hasMany(models.File, {
        foreignKey: {
          name: "fkId",
        },
        as: "messageFiles",
      });
    }
  }
  Message.init(
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      replyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      roomChatId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Message",
      paranoid: false,
    }
  );

  return Message;
};
