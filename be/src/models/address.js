"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.hasOne(models.User, { onDelete: "CASCADE" });
      Address.hasOne(models.RealEstate, { onDelete: "CASCADE" });
    }
  }
  Verify.init(
    {
      address: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      lat: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lng: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Address",
      paranoid: false,
    }
  );
  return Address;
};
