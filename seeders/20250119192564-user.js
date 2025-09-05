'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstname: "john",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "$2b$10$fU03eHRlH/RWjPQ69zPOmOb4aWNZTPL87tQhpptI/YmyVPxDeneOa",
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: "El",
        lastname: "la",
        email: "la.el@test.com",
        password: "$2b$10$fU03eHRlH/RWjPQ69zPOmOb4aWNZTPL87tQhpptI/YmyVPxDeneOa",
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
