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
      roomTotal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isWhole: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
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
