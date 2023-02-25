'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'EventImages';

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
    options.tableName = "EventImages";
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: "www.eventImage-1(preview true).com",
        preview: true
      },
      {
        eventId: 1,
        url: "www.eventImage-1(preview false).com",
        preview: false
      },
      {
        eventId: 2,
        url: "www.eventImage-2.com",
        preview: false
      },
      {
        eventId: 3,
        url: "www.eventImage-3.com",
        preview: true
      },
      {
        eventId: 4,
        url: "www.eventImage-4.com",
        preview: true
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
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    }, {});
  }
};
