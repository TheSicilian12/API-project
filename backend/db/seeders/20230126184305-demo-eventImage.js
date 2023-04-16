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
        url: "https://2.bp.blogspot.com/-6B723AeqtpI/Tyc1gdZz8sI/AAAAAAAABAk/EcewDrOWAO0/s1600/adventure_time_wrap_cover_585.jpg",
        preview: true
      },
      {
        eventId: 1,
        url: "https://i.ytimg.com/vi/-7WhexVt46Q/maxresdefault.jpg",
        preview: false
      },
      {
        eventId: 2,
        url: "https://c4.wallpaperflare.com/wallpaper/157/590/451/adventure-time-cartoon-network-finn-the-human-ice-king-fighting-wallpaper-preview.jpg",
        preview: true
      },
      {
        eventId: 3,
        url: "https://images6.fanpop.com/image/photos/38400000/Taste-my-Blade-adventure-time-with-finn-and-jake-38493348-900-579.jpg",
        preview: true
      },
      {
        eventId: 4,
        url: "https://1.bp.blogspot.com/-bQE-h8iiEdU/WmlPqdtSoYI/AAAAAAAANtk/bRv3KrH-iAgn-BMOXRdKsNrYBvs95iuTgCEwYBhgL/s1600/IMG_0235.jpg",
        preview: true
      },
      {
        eventId: 5,
        url: "https://miro.medium.com/v2/resize:fit:1400/0*WXMxjQ90bRN_HpPx.jpg",
        preview: true
      },
      {
        eventId: 5,
        url: "https://i.pinimg.com/originals/5e/08/a0/5e08a065f6b62071624f8077eb3471dd.jpg",
        preview: true
      },
      {
        eventId: 6,
        url: "",
        preview: true
      },
      {
        eventId: 7,
        url: "",
        preview: true
      },
      {
        eventId: 8,
        url: "",
        preview: true
      },
      {
        eventId: 9,
        url: "",
        preview: true
      },
      {
        eventId: 10,
        url: "https://pm1.narvii.com/8007/171857a900f728744a5b9b3dd0fcefbff80284ecr1-1280-720v2_hq.jpg",
        preview: true
      },
      {
        eventId: 10,
        url: "https://upload.wikimedia.org/wikipedia/en/0/06/Ricardiotheheartguy.png",
        preview: false
      },
      {
        eventId: 10,
        url: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51I0kBz2ExL._RI_.jpg",
        preview: false
      },
      {
        eventId: 10,
        url: "https://mediaproxy.tvtropes.org/width/350/https://static.tvtropes.org/pmwiki/pub/images/s7e12_titlecard.png",
        preview: false
      },
      {
        eventId: 11,
        url: "https://pbs.twimg.com/media/FWuMzIsWYAEt_Pm.jpg:large",
        preview: true
      },
      {
        eventId: 11,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYkkPPTWp-8qani8wGoJtHUj3g6xVFY1aWGw&usqp=CAU",
        preview: false
      },
      {
        eventId: 11,
        url: "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/b/b2/S4_E19_Princess_Bubblegum_holding_electro-gun.png/revision/latest?cb=20120820203924",
        preview: false
      },
      {
        eventId: 11,
        url: "https://i0.wp.com/thegeekiary.com/wp-content/uploads/2017/09/Adventure_Time_Episode_275_Still-1.jpg?resize=640%2C360&ssl=1",
        preview: false
      },
      {
        eventId: 12,
        url: "",
        preview: true
      },
      {
        eventId: 13,
        url: "",
        preview: true
      },
      {
        eventId: 14,
        url: "",
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
