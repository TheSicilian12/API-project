'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Venues';


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
    options.tableName = "Venues";
    return queryInterface.bulkInsert(options, [
      {
        address: '1111 road A',
        city: 'Denver',
        state: 'Colorado',
        lat: 111.1,
        lng: 222.2,
      },
      {
        address: '2222 road B',
        city: 'Columbus',
        state: 'Ohio',
        lat: 1212.1,
        lng: 4545.2,
      },
      {
        address: '3333 road C',
        city: 'Detroit',
        state: 'Michigan',
        lat: 7878.1,
        lng: 8787.2,
      },
      {
        address: '4444 road D',
        city: 'Dayton',
        state: 'Ohio',
        lat: 31.1,
        lng: 654.2,
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
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      state: { [Op.in]: ['Ohio', 'Michigan', 'Colorado'] }
    }, {});
  }
};
