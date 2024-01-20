"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Files", {
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
          model: "Messages",
          key: "id",
        },
        references: {
          model: "Floors",
          key: "id",
        },
        references: {
          model: "Rooms",
          key: "id",
        },
        references: {
          model: "RealEstates",
          key: "id",
        },
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
    await queryInterface.dropTable("Files");
  },
};
