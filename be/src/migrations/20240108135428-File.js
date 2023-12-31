"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("File", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      typeFile: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      typeFk: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      fkId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "Message",
          key: "id",
        },
        references: {
          model: "Floor",
          key: "id",
        },
        references: {
          model: "Room",
          key: "id",
        },
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
    await queryInterface.dropTable("File");
  },
};
