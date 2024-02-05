"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RealEstate extends Model {
    static associate(models) {
      RealEstate.belongsTo(models.Address, {
        foreignKey: { name: "addressId" },
      });
      RealEstate.hasMany(models.Floor);
    }
  }
  RealEstate.init(
    {
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
      },
      descriptionHtml: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      descriptionMarkdown: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      acreage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      floorTotal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      roomTotal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      isWhole: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isPet: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      autoPayment: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isPaymentCoin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      status: {
        type: DataTypes.STRING(1),
        allowNull: true,
        defaultValue: "1",
      },
    },
    {
      sequelize,
      modelName: "RealEstate",
      paranoid: false,
    }
  );

  return RealEstate;
};
