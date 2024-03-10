"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    static associate(models) {}
  }
  Term.init(
    {
      contractId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      accept: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Term",
      paranoid: false,
    }
  );

  return Term;
};
