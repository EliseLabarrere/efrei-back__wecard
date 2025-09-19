'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weward_chapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isVintage: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isEphemeral: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('weward_chapters');
  }
};