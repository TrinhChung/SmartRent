"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsTo(models.Floor, {
        foreignKey: {
          name: "fkId",
        },
      });
      File.belongsTo(models.Room, {
        foreignKey: {
          name: "fkId",
        },
      });
      File.belongsTo(models.Message, {
        foreignKey: {
          name: "fkId",
        },
      });
    }
  }
  File.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeFile: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      typeFk: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      fkId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "File",
      paranoid: false,
    }
  );

  return File;
};
