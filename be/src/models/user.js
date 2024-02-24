"use strict";
import { hashUserPassword } from "../utils/hashPassword";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Address, {
        foreignKey: { name: "addressId" },
      });

      User.hasMany(models.Verify, {
        foreignKey: "fkId",
      });

      User.hasMany(models.ExtraNotify);

      User.hasOne(models.File, { foreignKey: { name: "fkId" } });
    }
  }
  User.init(
    {
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue("firstName")} ${this.getDataValue(
            "lastName"
          )}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("password");
        },
        set(value) {
          this.setDataValue("password", hashUserPassword(value));
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "1",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wallet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maritalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: false,
      timestamps: true,
    }
  );
  return User;
};
