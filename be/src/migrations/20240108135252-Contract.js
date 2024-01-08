"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Contract", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      bargainId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Bargain",
          key: "id",
        },
      },
      renterId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      sellerId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      renterCost: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      timeStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      paymentDeadline: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      paymentType: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      deposit: {
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
    await queryInterface.dropTable("Contract");
  },
};
