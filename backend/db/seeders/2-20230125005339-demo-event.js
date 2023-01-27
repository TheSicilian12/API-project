'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Events';

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
    options.tableName = "Events";
    return queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: "event1",
        description: "event1 description",
        type: "test1",
        capacity: 10,
        price: 100,
        startDate: "2023-03-01",
        endDate: "2023-03-01"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "event2",
        description: "event2 description",
        type: "test1",
        capacity: 2,
        price: 1000,
        startDate: "2024-04-01",
        endDate: "2024-04-01"
      },
      {
        venueId: 3,
        groupId: 4,
        name: "event3",
        description: "event3 description",
        type: "test2",
        capacity: 100,
        price: 50,
        startDate: "2023-08-08",
        endDate: "2023-08-08"
      },
      {
        venueId: 4,
        groupId: 3,
        name: "event4",
        description: "event4 description",
        type: "test1",
        capacity: 5,
        price: 10,
        startDate: "2023-07-01",
        endDate: "2023-07-01"
      },
      {
        venueId: null,
        groupId: 3,
        name: "event5",
        description: "event5 description",
        type: "test1",
        capacity: 5,
        price: 10,
        startDate: "2024-08-01",
        endDate: "2024-08-01"
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
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['event1', 'event2', 'event3', 'event4', 'event5'] }
    }, {});


  }
};
