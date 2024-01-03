"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Verify extends Model {
    static associate(models) {}
  }
  Verify.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUUID: true },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fk_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Verify",
      paranoid: false,
    }
  );
  return Verify;
};
