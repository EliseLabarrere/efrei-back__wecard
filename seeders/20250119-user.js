'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        firstname: "john",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "$2b$10$fU03eHRlH/RWjPQ69zPOmOb4aWNZTPL87tQhpptI/YmyVPxDeneOa",
        accountWeward: 'john.doe',
        accountInsta: 'test',
        accountDiscord: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "El",
        lastname: "la",
        email: "la.el@test.com",
        password: "$2b$10$fU03eHRlH/RWjPQ69zPOmOb4aWNZTPL87tQhpptI/YmyVPxDeneOa",
        accountWeward: 'la.el',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: "Didier",
        lastname: "Didier",
        email: "didier@test.com",
        password: "$2b$10$fU03eHRlH/RWjPQ69zPOmOb4aWNZTPL87tQhpptI/YmyVPxDeneOa",
        role: 'super-admin',
        accountWeward: 'dider',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
