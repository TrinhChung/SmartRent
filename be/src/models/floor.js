"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    static associate(models) {
      Floor.belongsTo(models.RealEstate, {
        foreignKey: {
          name: "realEstateId",
        },
      });
      Floor.hasMany(models.Room);

      Floor.hasMany(models.File, {
        foreignKey: {
          name: "fkId",
        },
      });
    }
  }
  Floor.init(
    {
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      realEstateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      roomTotal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Floor",
      paranoid: false,
    }
  );

  return Floor;
};
