"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Signature extends Model {
    static associate(models) {
      Signature.hasOne(models.User);
    }
  }
  Signature.init(
    {
      sign: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Signature",
      paranoid: false,
    }
  );

  return Signature;
};
