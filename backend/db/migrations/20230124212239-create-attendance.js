'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Attendances"; //important! this needs to be on every migration.
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {model: 'Events'},
        allowNull: false,
        onDelete: "CASCADE"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: 'Users'},
        allowNull: false,
        onDelete: "CASCADE"
      },
      status: {
        type: Sequelize.ENUM ("member", "waitlist", "pending", "attending", ),
        defaultValue: "pending"
      },
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
    options.tableName = "Attendances"; //important! this needs to be on every migration.
    await queryInterface.dropTable(options);
  }
};
