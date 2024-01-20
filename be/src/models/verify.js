"use strict";
import { v4 as uuidv4 } from "uuid";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Verify extends Model {
    static associate(models) {
      Verify.belongsTo(models.User, {
        foreignKey: "fkId",
        as: "VerifyUser",
      });
    }
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
        validate: { isUUID: 4 },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fkId: {
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
