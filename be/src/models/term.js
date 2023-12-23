"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    static associate(models) {}
  }
  Term.init(
    {
      contractId: DataTypes.INTEGER.UNSIGNED,
      name: DataTypes.STRING(200),
      content: DataTypes.STRING(400),
    },
    {
      sequelize,
      modelName: "Term",
      paranoid: false,
    }
  );

  return Term;
};
