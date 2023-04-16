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
        url: 'https://media.wired.com/photos/593266104dc9b45ccec5da4b/master/w_2560%2Cc_limit/AdventureTime.jpg',
        preview: true,
      },
      {
        groupId: 2,
        url: 'https://cdn.wallpapersafari.com/89/71/vYaoRk.jpg',
        preview: true,
      },
      {
        groupId: 3,
        url: 'https://pyxis.nymag.com/v1/imgs/a78/7d6/96c5f3f236ec79b9c33325c97abb7c17cb-adventure-time-distant-lands-bmo.rsquare.w700.jpg',
        preview: true,
      },
      {
        groupId: 4,
        url: 'https://img.buzzfeed.com/buzzfeed-static/static/2022-09/22/18/asset/e217d4d915fe/sub-buzz-4558-1663869910-18.jpg',
        preview: true,
      },
      {
        groupId: 5,
        url: 'https://media.bantmag.com/wp-content/uploads/a/adventure-time-with-finn-and-jake-5191e35a3afea-800x533.jpg',
        preview: true,
      },
      {
        groupId: 6,
        url: 'https://i.pinimg.com/originals/ef/5b/e3/ef5be3494088f7a732b2f0773b0b8361.jpg',
        preview: true,
      },
      {
        groupId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/en/4/48/Adventure_Time_-_Marceline.png',
        preview: true,
      },
      {
        groupId: 9,
        url: 'https://www.syfy.com/sites/syfy/files/2020/06/lemongrab-adventure-time.jpg',
        preview: true,
      },
      {
        groupId: 9,
        url: 'https://i.ytimg.com/vi/3uMAgcBzItQ/maxresdefault.jpg',
        preview: false,
      },
      {
        groupId: 9,
        url: 'https://i.ytimg.com/vi/3uMAgcBzItQ/maxresdefault.jpg',
        preview: false,
      },
      {
        groupId: 9,
        url: 'https://i.ytimg.com/vi/3uMAgcBzItQ/maxresdefault.jpg',
        preview: false,
      },
      {
        groupId: 10,
        url: 'https://www.looper.com/img/gallery/why-ice-king-is-the-most-tragic-character-in-adventure-time/l-intro-1619451691.jpg',
        preview: true,
      },
      {
        groupId: 10,
        url: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/e/ef/Ice_King%27s_Drum_Set.png/revision/latest/scale-to-width-down/640?cb=20110411215509',
        preview: false,
      },
      {
        groupId: 10,
        url: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/e/ef/Ice_King%27s_Drum_Set.png/revision/latest/scale-to-width-down/640?cb=20110411215509',
        preview: false,
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
