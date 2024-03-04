"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RealEstate extends Model {
    static associate(models) {
      RealEstate.belongsTo(models.Address, {
        foreignKey: { name: "addressId" },
      });

      RealEstate.hasMany(models.File, {
        foreignKey: {
          name: "fkId",
        },
        as: "realEstateFiles",
      });

      RealEstate.hasOne(models.Bargain);

      RealEstate.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
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
      description: {
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
      bedroomTotal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
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
      type: {
        type: DataTypes.STRING(1),
        allowNull: true,
        defaultValue: "1",
      },
      facade: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      isInterior: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      toiletTotal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      directionHouse: {
        type: DataTypes.STRING(100),
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
