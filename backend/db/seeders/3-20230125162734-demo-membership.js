'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Memberships';

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

    options.tableName = "Memberships";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: "host"
      },
      {
        userId: 2,
        groupId: 1,
        status: "member"
      },
      {
        userId: 3,
        groupId: 1,
        status: "member"
      },
      {
        userId: 4,
        groupId: 1,
        status: "co-host"
      },
      {
        userId: 5,
        groupId: 1,
        status: "pending"
      },
      {
        userId: 8,
        groupId: 1,
        status: "member"
      },
      {
        userId: 2,
        groupId: 2,
        status: "host"
      },
      {
        userId: 3,
        groupId: 2,
        status: "pending"
      },
      {
        userId: 10,
        groupId: 2,
        status: "member"
      },
      {
        userId: 3,
        groupId: 3,
        status: "host"
      },
      {
        userId: 1,
        groupId: 3,
        status: "pending"
      },
      {
        userId: 5,
        groupId: 3,
        status: "member"
      },
      {
        userId: 6,
        groupId: 3,
        status: "co-host"
      },
      {
        userId: 10,
        groupId: 3,
        status: "co-host"
      },
      {
        userId: 9,
        groupId: 3,
        status: "member"
      },
      {
        userId: 4,
        groupId: 4,
        status: "host"
      },
      {
        userId: 2,
        groupId: 4,
        status: "member"
      },
      {
        userId: 1,
        groupId: 4,
        status: "member"
      },
      {
        userId: 2,
        groupId: 5,
        status: "host"
      },
      {
        userId: 1,
        groupId: 6,
        status: "host"
      },
      {
        userId: 1,
        groupId: 7,
        status: "host"
      },
      {
        userId: 1,
        groupId: 8,
        status: "host"
      },
      {
        userId: 1,
        groupId: 10,
        status: "co-host"
      },
      {
        userId: 8,
        groupId: 9,
        status: "host"
      },
      {
        userId: 5,
        groupId: 10,
        status: "host"
      },
    ], {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
