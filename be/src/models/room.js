"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Floor, {
        foreignKey: { name: "floorId" },
      });

      Room.hasMany(models.File, {
        foreignKey: {
          name: "fkId",
        },
      });
    }
  }
  Room.init(
    {
      floorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      acreage: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(200),
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
      status: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Room",
      paranoid: false,
    }
  );

  return Room;
};
