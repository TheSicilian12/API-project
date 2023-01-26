const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

router.get('/', async (req, res) => {

    let eventObj = {}
    eventObj.Events = []

    let events = await Event.findAll({
        include: [{ model: Group }, { model: Venue }]
    })

// console.log(events[4].Venue)
// console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")

    for (let event of events) {
        let item = {};

        let image = await EventImage.findAll({
            where: EventImage.eventId = event.id
        })

        let numAttend = await Attendance.findAll({
            where: {
                eventId: event.id,
                status: "attending" //ATTENDANCE ENUM VALUE!!!!!!!!!!!!!!!!!!!
            }
        })

        // if (image[0]) {
        //     console.log("hello ", event.id, " -----------------------------")
        // } else console.log("hahahahahahahahahahahahahahaha")

        if (image[0]) {
        // console.log("--------------")
        // console.log(image[0].dataValues)
        item.previewImage = image[0].dataValues.url
        }

        item.id = event.id
        item.groupId = event.groupId
        item.venueId = event.venueId
        item.name = event.name
        item.type = event.type
        item.startDate = event.startDate
        item.endDate = event.endDate

        item.numAttending = numAttend.length

    //     // item.previewImage = image[0].dataValues.url

        item.Group = {};
        item.Group.id = event.Group.dataValues.id;
    //     // console.log(event.Group.dataValues.id)
    //     console.log("---------------------------------------------------------")
        item.Group.name = event.Group.dataValues.name;
        item.Group.city = event.Group.dataValues.city;
        item.Group.state = event.Group.dataValues.state;

    //     console.log(event)
        if (event.Venue) {
        item.Venue = {};
        item.Venue.id = event.Venue.dataValues.id;
        item.Venue.city = event.Venue.dataValues.city;
        item.Venue.state = event.Venue.dataValues.state;
        } else item.Venue = null



        eventObj.Events.push(item)
    //     // console.log(event)

    //     // console.log(image.dataValues.url)
    //     // console.log("----------")
    }

    return res.json(eventObj)

})



module.exports = router;
