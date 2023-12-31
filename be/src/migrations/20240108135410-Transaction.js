"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaction", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      contractId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "Contract",
          key: "id",
        },
        allowNull: false,
      },
      acreage: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transaction");
  },
};
