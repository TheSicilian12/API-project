'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Groups';


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
    options.tableName = "Groups";
    return queryInterface.bulkInsert(options, [
      {
        name: "Group1",
        organizerId: 1,
        about: "about group1",
        type: 'In person',
        private: true,
        city: "Columbus",
        state: "Ohio"
      },
      {
        name: "Group2",
        organizerId: 2,
        about: 'about group2',
        type: 'Online',
        private: true,
        city: "Columbus",
        state: "Ohio"
      },
      {
        name: "Group3",
        organizerId: 3,
        about: "about group3",
        type: 'In person',
        private: true,
        city: "Detroit",
        state: "Michigan"
      },
      {
        name: "Group4",
        organizerId: 4,
        about: "about group4",
        type: 'Online',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group5",
        organizerId: 2,
        about: "about group5",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group6",
        organizerId: 1,
        about: "about group6",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group7",
        organizerId: 1,
        about: "about group7",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group8",
        organizerId: 1,
        about: "about group8",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group9",
        organizerId: 8,
        about: "about group9",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group10",
        organizerId: 5,
        about: "about group10",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
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
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Group1', 'Group2', 'Group3', 'Group4', 'Group5'] }
    }, {});
  }
};
