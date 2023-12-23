"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notify extends Model {
    static associate(models) {}
  }
  Notify.init(
    {
      fkId: DataTypes.INTEGER.UNSIGNED,
      extraNotifyId: DataTypes.INTEGER.UNSIGNED,
      type: DataTypes.STRING(1),
      content: DataTypes.STRING(200),
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notify",
      paranoid: false,
    }
  );

  return Notify;
};
