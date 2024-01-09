"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {
    static associate(models) {
      RoomChat.hasMany(models.Message);
      RoomChat.belongsTo(models.Bargain, { foreignKey: { name: "bargainId" } });
    }
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
