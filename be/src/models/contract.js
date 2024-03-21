"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.hasOne(models.RoomChat);
      Contract.belongsTo(models.RealEstate, {
        foreignKey: {
          name: "realEstateId",
        },
      });
      Contract.belongsTo(models.User, {
        foreignKey: {
          name: "renterId",
        },
        as: "renter",
      });
      Contract.belongsTo(models.User, {
        foreignKey: {
          name: "sellerId",
        },
        as: "seller",
      });
      Contract.hasMany(models.Term, {
        foreignKey: {
          name: "contractId",
        },
      });
    }
  }
  Contract.init(
    {
      realEstateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(1),
        allowNull: false,
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
      duration: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      paymentDeadline: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      paymentType: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      deposit: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Contract",
      paranoid: false,
    }
  );

  return Contract;
};
