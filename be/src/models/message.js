"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {}
  }
  Message.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      replyId: DataTypes.INTEGER.UNSIGNED,
      roomChatId: DataTypes.INTEGER.UNSIGNED,
      content: DataTypes.STRING(400),
    },
    {
      sequelize,
      modelName: "Message",
      paranoid: false,
    }
  );

  return Message;
};
