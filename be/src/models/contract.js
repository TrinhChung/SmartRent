"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.Bargain, { foreignKey: { name: "bargainId" } });
    }
  }
  Contract.init(
    {
      bargainId: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      renterCost: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      timeStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentDeadline: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      deposit: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
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
