'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('weward_chapters', [
      {
        en: "New York",
        fr: "New York",
        isVintage: true,
        isEphemeral: false,
        createdAt: new Date(),
      },
      {
        en: "Christmas 2025",
        fr: "Noël 2025",
        isVintage: true,
        isEphemeral: true,
        createdAt: new Date(),
      },
      {
        en: "Boston",
        fr: "Boston",
        isVintage: false,
        isEphemeral: false,
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('weward_chapters', null, {});
  }
};
