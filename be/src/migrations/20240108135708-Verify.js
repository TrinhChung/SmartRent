"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Verifies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isUUID: true },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fkId: {
        type: Sequelize.INTEGER.UNSIGNED,
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
    await queryInterface.dropTable("Verifies");
  },
};
