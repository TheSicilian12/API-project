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
        name: "event1 (associated with group 1)",
        description: "this is an event description!",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: '2023-04-01 01:00:00',
        endDate: '2023-04-01 02:30:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: "event2 (associated with group 1)",
        description: "event! event!",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: '2023-04-01 01:00:00',
        endDate: '2023-04-01 02:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: "event3 (associated with group 1)",
        description: "fight! kill! get gold!",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: '1999-04-01 01:30:00',
        endDate: '1999-04-01 012:30:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: "event4 (associated with group 2)",
        description: "or just go into an empty dungeon",
        type: "In Person",
        capacity: 2,
        price: 1000,
        startDate: "2023-04-01 01:30:00",
        endDate: "2023-04-01 23:30:00"
      },
      {
        venueId: 3,
        groupId: 4,
        name: "event5 (associated with group 4)",
        description: "this way or that way",
        type: "Online",
        capacity: 100,
        price: 50,
        startDate: "2023-04-02 05:30:00",
        endDate: "2023-04-02 06:30:00"
      },
      {
        venueId: 4,
        groupId: 3,
        name: "event6 (associated with group 3)",
        description: "practice your fighting",
        type: "In Person",
        capacity: 5,
        price: 10,
        startDate: "2023-04-03 18:30:00",
        endDate: "2023-04-03 19:30:00"
      },
      {
        venueId: 4,
        groupId: 3,
        name: "event7 (associated with group 3)",
        description: "arrows are cool",
        type: "Online",
        capacity: 5,
        price: 10,
        startDate: "2023-04-04 10:00:00",
        endDate: "2023-04-04 11:25:00"
      },
      {
        venueId: 1,
        groupId: 1,
        name: "event8 (associated with group 1)",
        description: "when will you learn you need a backpack",
        type: "In Person",
        capacity: 10,
        price: 100,
        startDate: "2023-04-03 04:30:00",
        endDate: "2023-04-03 04:36:00"
      },
      {
        venueId: 2,
        groupId: 1,
        name: "event9 (associated with group 1)",
        description: "group 1 for the win",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-05 03:30:00",
        endDate: "2023-04-05 19:02:00"
      },
      {
        groupId: 1,
        name: "event10 (associated with group 1)",
        description: "no venue!",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 08:30:00",
        endDate: "2023-04-30 18:40:00"
      },
      {
        groupId: 8,
        name: "event11 (associated with group 8)",
        description: "this event should have no members",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 04:40:00",
        endDate: "2023-04-30 05:44:00"
      },
      {
        groupId: 10,
        name: "event12(associated with group 10)",
        description: "no venue again",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 10:30:00",
        endDate: "2023-04-30 20:30:00"
      },
      {
        groupId: 9,
        name: "event13 (associated with group 9)",
        description: "no venue still",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 20:30:00",
        endDate: "2023-04-30 23:59:00"
      },
      {
        venueId: 6,
        groupId: 10,
        name: "event14 (associated with group 10)",
        description: "an event to fight monsters",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 13:30:00",
        endDate: "2023-04-30 14:45:00"
      },
      {
        venueId: 6,
        groupId: 10,
        name: "event15 (associated with group 10)",
        description: "something lurks in the sewers",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 15:30:00",
        endDate: "2023-04-30 16:00:00"
      },
      {
        venueId: 6,
        groupId: 10,
        name: "event16 (associated with group 10)",
        description: "rat extermination day! let's go!",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-05-30 00:30:00",
        endDate: "2023-05-30 01:30:00"
      },
      {
        groupId: 10,
        name: "event17 (associated with group 10)",
        description: "the pide piper must die",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-06-30 04:30:00",
        endDate: "2023-06-30 14:29:00"
      },
      {
        groupId: 10,
        name: "evemt18 (associated with group 10)",
        description: "the pide piper's flute for sale",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 06:30:00",
        endDate: "2023-04-30 08:32:00"
      },
      {
        groupId: 10,
        name: "event19 (associated with group 10)",
        description: "murder mystery",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-04-30 04:30:00",
        endDate: "2023-04-30 07:40:00"
      },
      {
        groupId: 9,
        name: "event20 (associated with group 9)",
        description: "sometimes you just need a day off",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-05-01 04:30:00",
        endDate: "2023-05-01 08:30:00"
      },
      {
        groupId: 9,
        name: "event21 (associated with group 9)",
        description: "holiday party",
        type: "Online",
        capacity: 10,
        price: 100,
        startDate: "2023-05-30 09:30:00",
        endDate: "2023-05-30 12:30:00"
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
