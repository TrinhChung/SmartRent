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
      roomTotal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
