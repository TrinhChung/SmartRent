"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Contracts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      renterId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      sellerId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      realEstateId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      cid: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      paymentDeadline: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      paymentType: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      deposit: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: true,
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
    await queryInterface.dropTable("Contracts");
  },
};
