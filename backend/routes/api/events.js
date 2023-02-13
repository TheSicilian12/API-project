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
    // let events = await Event.findAll({
    //     attributes: ["id", "groupId", "venueId", "name", "type", "startDate", "endDate"],
    //     include: [
    //         { model: Venue, attributes: ["id", "city", "state"] },
    //         { model: Group, attributes: ["id", "name", "city", "state"] },
    //         { model: EventImage, attributes: ['url'] },
    //         { model: Attendance }
    //     ]
    // })

    let events = await Event.findAll()

    //json
    for (let event of events) {
        eventObj.Events.push(event.toJSON())
    }


    //preview image add
    for (let e of eventObj.Events) {
        // console.log(e.EventImages)
        if (e.EventImages[0]) {
            e.previewImage = e.EventImages[0].url
        }
        delete e.EventImages
    }
    // update
    //num attending add
    for (let e of eventObj.Events) {
        if (e.Attendances.length) {
            let count = []
            for (let attend of e.Attendances) {
                // console.log(attend.status)
                if (attend.status === "test1") { // THIS WOULD BE WHERE AN ENUM CHANGE WOULD TAKE PLACE
                    count.push(attend)
                }
            }
            e.numAttending = count.length
        } else e.numAttending = 0;
        delete e.Attendances
    }


    res.json(eventObj)
})

//GET DETAILS OF AN EVENT SPECIFIED BY ITS ID
router.get('/:eventId', async (req, res, next) => {
    let event = await Event.findByPk(req.params.eventId, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']}, {model: EventImage, attributes: ['id', 'url', 'preview']}, {model: Attendance, attributes: ['status']}]
    })

    //If no event exists
    if(!event) {
        const err = new Error("Couldn't find a Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //add Number attending
    let numberAttending = 0;
    for (let attendee of event.Attendances) {
        console.log(attendee.dataValues.status)
        if (attendee.dataValues.status === "true") {
            numberAttending++;
        }
    }


    let adjustedEvent = event.toJSON()
    adjustedEvent.numAttending = numberAttending;
    delete adjustedEvent.Attendances

    return res.json(adjustedEvent)
})

module.exports = router;
