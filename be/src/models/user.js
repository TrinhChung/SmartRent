"use strict";
import { hashUserPassword } from "../utils/hashPassword";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Address, {
        foreignKey: { name: "addressId" },
      });

      User.belongsTo(models.Signature, {
        foreignKey: { name: "signatureId" },
      });

      User.hasMany(models.Verify, {
        foreignKey: "fkId",
      });

      User.hasMany(models.Notify);

      User.hasOne(models.File, { foreignKey: { name: "fkId" } });

      User.hasOne(models.RealEstate, { foreignKey: { name: "userId" } });

      User.hasOne(models.Contract, {
        foreignKey: { name: "renterId" },
        as: "renter",
      });

      User.hasOne(models.Contract, {
        foreignKey: { name: "sellerId" },
        as: "seller",
      });
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
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      signatureId: {
        type: DataTypes.INTEGER.UNSIGNED,
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
