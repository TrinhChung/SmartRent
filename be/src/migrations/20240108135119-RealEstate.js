"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RealEstates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      addressId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Addresses",
          key: "id",
        },
      },
      cost: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: false,
      },
      descriptionHtml: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      acreage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      floorTotal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      roomTotal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isElevator: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isPet: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RealEstates");
  },
};
