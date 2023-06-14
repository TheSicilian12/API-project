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
        url: "https://a0.anyrgb.com/pngimg/1166/330/adventure-time-season-1-finn-the-human-jake-the-dog-ice-king-fionna-and-cake-jake-the-dog-princess-bubblegum-marceline-the-vampire-queen-finn-the-human-adventure-time-cartoon-network-thumbnail.png",
        preview: true
      },
      {
        eventId: 7,
        url: "https://m.media-amazon.com/images/M/MV5BNTYwNTQzMDUtODA2Zi00ZTU5LWI4NTMtN2ZjOGI3NmQyZmI2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg",
        preview: true
      },
      {
        eventId: 8,
        url: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/q_auto:good,f_auto,fl_lossy,w_480,c_limit,dpr_2.5/cdn/bb97e6e8-63e0-4be2-9504-0546245dad18/a181c066-00cb-4266-8383-8952d426b148_560_420.jpg",
        preview: true
      },
      {
        eventId: 9,
        url: "https://m.media-amazon.com/images/M/MV5BNjk0MDg2MjI1M15BMl5BanBnXkFtZTgwMTgxODU1MjE@._V1_FMjpg_UX1000_.jpg",
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
        url: "https://m.media-amazon.com/images/M/MV5BZDIxNjcyYzYtYTA5Yy00ZjA1LWI1NTctMzQ1NjAwYWZiMmNjXkEyXkFqcGdeQXVyOTI2NTUyMjQ@._V1_.jpg",
        preview: true
      },
      {
        eventId: 12,
        url: "https://i.pinimg.com/originals/19/84/ba/1984badba61384306b76f245dc445fc7.jpg",
        preview: true
      },
      {
        eventId: 13,
        url: "https://assets1.ignimgs.com/2014/02/14/cardwarsadventuretimejpg-1e0be5.jpg",
        preview: true
      },
      {
        eventId: 14,
        url: "https://cdn.mos.cms.futurecdn.net/4gk2CDHzbie23Uc9pwKiTX.jpg",
        preview: true
      },
      {
        eventId: 15,
        url: "https://helios-i.mashable.com/imagery/articles/06rL56xfFThF3qCmi0WmUQU/hero-image.fill.size_1200x1200.v1623372673.jpg",
        preview: true
      },
      {
        eventId: 16,
        url: "https://c4.wallpaperflare.com/wallpaper/762/442/397/tv-show-adventure-time-bmo-adventure-time-finn-adventure-time-jake-adventure-time-hd-wallpaper-preview.jpg",
        preview: true
      },
      {
        eventId: 17,
        url: "https://cdn.suwalls.com/wallpapers/cartoons/finn-and-jake-adventure-time-15742-1920x1080.jpg",
        preview: true
      },
      {
        eventId: 18,
        url: "https://images2.alphacoders.com/213/213440.jpg",
        preview: true
      },
      {
        eventId: 19,
        url: "https://tvline.com/wp-content/uploads/2018/09/adventure-time-series-finale1.jpg",
        preview: true
      },
      {
        eventId: 20,
        url: "https://www.looper.com/img/gallery/the-adventure-time-scene-that-had-fans-in-tears/intro-1637773920.jpg",
        preview: true
      },
      {
        eventId: 21,
        url: "https://i.ytimg.com/vi/PQH_y2wicF8/maxresdefault.jpg",
        preview: true
      },
      {
        eventId: 22,
        url: "https://flxt.tmsimg.com/assets/p10810505_i_v9_aa.jpg",
        preview: true
      },
      {
        eventId: 23,
        url: "https://i.cartoonnetwork.com/orchestrator/812767_004_640x360.jpg",
        preview: true
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
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    }, {});
  }
};
