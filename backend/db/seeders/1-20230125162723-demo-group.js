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
        organizerId: 11,
        about: "This is an about section for group1. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: true,
        city: "Columbus",
        state: "Ohio"
      },
      {
        name: "Group2",
        organizerId: 2,
        about: "This is an about section for group2. You should consider joining this group if you haven't already.",
        type: 'Online',
        private: true,
        city: "Columbus",
        state: "Ohio"
      },
      {
        name: "Group3",
        organizerId: 3,
        about: "This is an about section for group3. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: true,
        city: "Detroit",
        state: "Michigan"
      },
      {
        name: "Group4",
        organizerId: 4,
        about: "This is an about section for group4. You should consider joining this group if you haven't already.",
        type: 'Online',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group5",
        organizerId: 2,
        about: "This is an about section for group5. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group6",
        organizerId: 1,
        about: "This is an about section for group6. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group7",
        organizerId: 1,
        about: "This is an about section for group7. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group8",
        organizerId: 1,
        about: "This is an about section for group8. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group9",
        organizerId: 8,
        about: "This is an about section for group9. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
      },
      {
        name: "Group10",
        organizerId: 5,
        about: "This is an about section for group10. You should consider joining this group if you haven't already.",
        type: 'In person',
        private: false,
        city: "Denver",
        state: "Colorado"
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
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Group1', 'Group2', 'Group3', 'Group4', 'Group5', 'Group6', 'Group7', 'Group8', 'Group9', 'Group10'] }
    }, {});
  }
};
