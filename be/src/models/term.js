"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    static associate(models) {
      Term.belongsTo(models.Contract, {
        foreignKey: {
          name: "contractId",
        },
      });

      Term.hasMany(models.Contradiction, {
        foreignKey: {
          name: "termId",
        },
      });
    }
  }
  Term.init(
    {
      contractId: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "other",
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
