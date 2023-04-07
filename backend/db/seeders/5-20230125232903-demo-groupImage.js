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
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5SjjulTpiXxKuLHh9mlEGVmun-IYoI5YtQ&usqp=CAU',
        preview: true,
      },
      {
        groupId: 2,
        url: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20190807133015',
        preview: false,
      },
      {
        groupId: 3,
        url: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/0/00/Princess_Bubblegum.png/revision/latest?cb=20190807133134',
        preview: false,
      },
      {
        groupId: 4,
        url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d32b7d0a-208a-4fd6-afff-e19b964bb606/d5f3z7r-a5ba1c4f-ce81-4555-bb47-7377986061ac.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QzMmI3ZDBhLTIwOGEtNGZkNi1hZmZmLWUxOWI5NjRiYjYwNlwvZDVmM3o3ci1hNWJhMWM0Zi1jZTgxLTQ1NTUtYmI0Ny03Mzc3OTg2MDYxYWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pNdxZCMcTjH3N-t6wASl9HlGkp9d4bE6gC3Q61lGlcI',
        preview: true,
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
      },
      {
        groupId: 10,
        url: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/e/ef/Ice_King%27s_Drum_Set.png/revision/latest/scale-to-width-down/640?cb=20110411215509',
        preview: false,
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
