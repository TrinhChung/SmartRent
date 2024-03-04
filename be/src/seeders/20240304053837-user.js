"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "seller@gmail.com",
        isActive: true,
        lastName: "John",
        firstName: "Seller",
        role: "2",
        password:
          "$2a$10$N8Sz9KVPtdWDjA25Zotdu.Lp1nG9KkyddU8fTYcWGKler6S7.MM1u",
      },
      {
        email: "renter@gmail.com",
        isActive: true,
        lastName: "John",
        firstName: "renter",
        role: "1",
        password:
          "$2a$10$N8Sz9KVPtdWDjA25Zotdu.Lp1nG9KkyddU8fTYcWGKler6S7.MM1u",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
