"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bargain extends Model {
    static associate(models) {
      Bargain.hasOne(models.RoomChat);
      Bargain.belongsTo(models.RealEstate, {
        foreignKey: {
          name: "realEstateId",
        },
      });
      Bargain.hasOne(models.Contract);
    }
  }
  Bargain.init(
    {
      realEstateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(1),
        allowNull: true,
        defaultValue: "1",
      },
      renterId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      sellerId: {
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
