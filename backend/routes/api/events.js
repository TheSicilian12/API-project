const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

//GET ALL EVENTS
router.get('/', async (req, res) => {
    //return setup
    let eventObj = {};
    eventObj.Events = [];

    //main search
    let events = await Event.findAll({
        attributes: ["id", "groupId", "venueId", "name", "type", "startDate", "endDate"],
        include: [
            { model: Venue, attributes: ["id", "city", "state"] },
            { model: Group, attributes: ["id", "name", "city", "state"] },
            { model: EventImage, attributes: ['url'] },
            { model: Attendance }
        ]
    })

    //json
    for (let event of events) {
        eventObj.Events.push(event.toJSON())
    }
    

    // //preview image add
    // for (let e of eventObj.Events) {
    //     // console.log(e.EventImages)
    //     if (e.EventImages[0]) {
    //         e.previewImage = e.EventImages[0].url
    //     }
    //     delete e.EventImages
    // }

    // //num attending add
    // for (let e of eventObj.Events) {
    //     if (e.Attendances.length) {
    //         let count = []
    //         for (let attend of e.Attendances) {
    //             // console.log(attend.status)
    //             if (attend.status === "test1") { // THIS WOULD BE WHERE AN ENUM CHANGE WOULD TAKE PLACE
    //                 count.push(attend)
    //             }
    //         }
    //         e.numAttending = count.length
    //     } else e.numAttending = 0;
    //     delete e.Attendances
    // }

    res.json(eventObj)

})



module.exports = router;
