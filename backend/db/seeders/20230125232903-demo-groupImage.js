'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'GroupImages';


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
    options.tableName = "GroupImages";
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'www.group1-groupImage',
        preview: true,
      },
      {
        groupId: 2,
        url: 'www.group2-groupImage',
        preview: false,
      },
      {
        groupId: 3,
        url: 'www.group3-groupImage',
        preview: true,
      },
      {
        groupId: 4,
        url: 'www.group4-groupImage',
        preview: true,
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
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['www.group1-groupImage', 'www.group2-groupImage', 'www.group3-groupImage', 'www.group4-groupImage'] }
    }, {});
  }
};
