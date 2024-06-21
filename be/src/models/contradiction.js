"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contradiction extends Model {
    static associate(models) {
      Contradiction.belongsTo(models.Term, {
        foreignKey: {
          name: "termId",
        },
      });
    }
  }
  Contradiction.init(
    {
      termId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      targetId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Contradiction",
      paranoid: false,
      timestamps: true,
    }
  );
  return Contradiction;
};
