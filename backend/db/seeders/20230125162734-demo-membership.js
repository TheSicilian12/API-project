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
        status: "test1"
      },
      {
        userId: 1,
        groupId: 2,
        status: "test1"
      },
      {
        userId: 2,
        groupId: 1,
        status: "test1"
      },
      {
        userId: 2,
        groupId: 2,
        status: "test1"
      },
      {
        userId: 3,
        groupId: 4,
        status: "test1"
      },
      {
        userId: 3,
        groupId: 1,
        status: "test1"
      },
      {
        userId: 4,
        groupId: 1,
        status: "test1"
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
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
