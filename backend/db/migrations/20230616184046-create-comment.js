'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Comments"; //important! this needs to be on every migration.
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: 'Users'},
        allowNull: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {model: "Events"},
        allowNull: true,
        onDelete: "CASCADE"
      },
      comment: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Comments"; //important! this needs to be on every migration.
    await queryInterface.dropTable(options);
  }
};
