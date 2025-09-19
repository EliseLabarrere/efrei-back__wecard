'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_weward_chapters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      idWewardChapter: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'weward_chapters',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      card1: { type: Sequelize.INTEGER, defaultValue: 0 },
      card2: { type: Sequelize.INTEGER, defaultValue: 0 },
      card3: { type: Sequelize.INTEGER, defaultValue: 0 },
      card4: { type: Sequelize.INTEGER, defaultValue: 0 },
      card5: { type: Sequelize.INTEGER, defaultValue: 0 },
      card6: { type: Sequelize.INTEGER, defaultValue: 0 },
      card7: { type: Sequelize.INTEGER, defaultValue: 0 },
      card8: { type: Sequelize.INTEGER, defaultValue: 0 },
      card9: { type: Sequelize.INTEGER, defaultValue: 0 },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addConstraint('user_weward_chapters', {
      fields: ['idUser', 'idWewardChapter'],
      type: 'unique',
      name: 'unique_user_chapter'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_weward_chapters');
  }
};
