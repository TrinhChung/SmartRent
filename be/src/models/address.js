"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {}
  }
  Verify.init(
    {
      address: DataTypes.STRING,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
      paranoid: false,
    }
  );
  return Address;
};
