"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {}
  }
  Contract.init(
    {
      renterId: DataTypes.INTEGER.UNSIGNED,
      sellerId: DataTypes.INTEGER.UNSIGNED,
      renterCost: DataTypes.FLOAT.UNSIGNED,
      duration: DataTypes.INTEGER.UNSIGNED,
      timeStart: DataTypes.DATE,
      paymentDeadline: DataTypes.STRING(100),
      paymentType: DataTypes.STRING(1),
      deposit: DataTypes.FLOAT.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Contract",
      paranoid: false,
    }
  );

  return Contract;
};
