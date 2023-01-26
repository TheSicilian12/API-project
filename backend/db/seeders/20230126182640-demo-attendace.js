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
        status: true
      },
      {
        eventId: 2,
        userId: 1,
        status: false
      },
      {
        eventId: 1,
        userId: 2,
        status: true
      },
      {
        eventId: 2,
        userId: 2,
        status: false
      },
      {
        eventId: 2,
        userId: 10,
        status: true
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
