"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notify extends Model {
    static associate(models) {}
  }
  Notify.init(
    {
      fkId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      extraNotifyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Notify",
      paranoid: false,
    }
  );

  return Notify;
};
