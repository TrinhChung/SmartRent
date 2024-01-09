"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Message", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "User",
          key: "id",
        },
        allowNull: false,
      },
      replyId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      roomChatId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "RoomChat",
          key: "id",
        },
      },
      content: {
        type: Sequelize.STRING(400),
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
    await queryInterface.dropTable("Message");
  },
};
