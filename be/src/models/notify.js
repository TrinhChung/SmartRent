"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notify extends Model {
    static associate(models) {
      Notify.hasMany(models.ExtraNotify);
    }
  }
  Notify.init(
    {
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
