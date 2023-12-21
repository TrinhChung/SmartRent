"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {}
  }
  File.init(
    {
      url: DataTypes.STRING,
      acreage: DataTypes.FLOAT.UNSIGNED,
      typeFile: DataTypes.STRING(1),
      typeFk: DataTypes.STRING(200),
      fkId: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: "File",
      paranoid: false,
    }
  );

  return File;
};
