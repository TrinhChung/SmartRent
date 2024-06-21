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
      },
      addressId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: false,
      },
      description: {
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
      bedroomTotal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isPet: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      autoPayment: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isPaymentCoin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      facade: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      isInterior: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      toiletTotal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      directionHouse: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: "1",
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
