"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExtraNotify extends Model {
    static associate(models) {
      ExtraNotify.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
      ExtraNotify.belongsTo(models.Notify, {
        foreignKey: {
          name: "notifyId",
        },
      });
    }
  }
  ExtraNotify.init(
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      notifyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExtraNotify",
      paranoid: false,
    }
  );

  return ExtraNotify;
};
