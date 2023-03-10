'use strict';
/** @type {import('sequelize-cli').Migration} */

// all sequelize migrations and seeder files will need the following block of code.
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Memberships"; //important! this needs to be on every migration.
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: 'Users'},
        allowNull: false,
        onDelete: "CASCADE"
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {model: 'Groups'},
        allowNull: false,
        onDelete: "CASCADE"
      },
      status: {
        type: Sequelize.ENUM ("host", "co-host", "member", "pending"),
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
    options.tableName = "Memberships"; //important! this needs to be on every migration.
    await queryInterface.dropTable(options);
  }
};
