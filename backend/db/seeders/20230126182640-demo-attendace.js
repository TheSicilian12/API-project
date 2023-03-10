'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Attendances';

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
    options.tableName = "Attendances";
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        status: "member"
      },
      {
        eventId: 2,
        userId: 1,
        status: "waitlist"
      },
      {
        eventId: 1,
        userId: 2,
        status: "member"
      },
      {
        eventId: 1,
        userId: 3,
        status: "pending"
      },
      {
        eventId: 2,
        userId: 2,
        status: "pending"
      },
      {
        eventId: 2,
        userId: 10,
        status: "member"
      },
      {
        eventId: 7,
        userId: 10,
        status: "member"
      },
      {
        eventId: 7,
        userId: 1,
        status: "member"
      },
      {
        eventId: 7,
        userId: 2,
        status: "member"
      },
      {
        eventId: 7,
        userId: 3,
        status: "member"
      },
      {
        eventId: 7,
        userId: 4,
        status: "waitlist"
      },
      {
        eventId: 7,
        userId: 5,
        status: "pending"
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
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    }, {});
  }
};
