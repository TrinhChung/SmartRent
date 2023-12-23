"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bargain extends Model {
    static associate(models) {}
  }
  Bargain.init(
    {
      realEstateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      renterId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      sellerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      roomChatId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Bargain",
      paranoid: false,
    }
  );

  return Bargain;
};
