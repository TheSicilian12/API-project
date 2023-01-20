'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo2@user.io',
        username: 'DemoUser2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo3@user.io',
        username: 'DemoUser3',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo4@user.io',
        username: 'DemoUser4',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo5@user.io',
        username: 'DemoUser5',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo6@user.io',
        username: 'DemoUser6',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo7@user.io',
        username: 'DemoUser7',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo8@user.io',
        username: 'DemoUser8',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo9@user.io',
        username: 'DemoUser9',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo10@user.io',
        username: 'DemoUser10',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser', 'DemoUser2', 'DemoUser3', 'DemoUser4', 'DemoUser5', 'DemoUser6', 'DemoUser7', 'DemoUser8', 'DemoUser9', 'DemoUser10'] }
    }, {});
  }
};
