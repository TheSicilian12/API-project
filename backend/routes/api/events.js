const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


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
    // return res.json(events)

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
        include: [
        { model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng'] },
        { model: EventImage, attributes: ['id', 'url', 'preview'] },
        { model: Attendance, attributes: ['status'] },
        { model: Group, attributes: ['id', 'name', 'private', 'city', 'state']} //add attributes
        ]
    })

    //If no event exists
    if (!event) {
        const err = new Error("Couldn't find a Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    let eventJSON = event.toJSON()

    //test for live site
    let numberAttending = 0;
    for (let attendee of eventJSON.Attendances) {
        if (attendee.status === 'true') {
            numberAttending++
        }
    }

    eventJSON.numAttending = numberAttending;
    delete eventJSON.Attendances

    return res.json(eventJSON)
})

//EDIT AN EVENT SPECIFIED BY ITS ID
router.put('/:eventId', requireAuth, async (req, res, next) => {
    const { user } = req
    const {venueId, name, type, capacity, price, description, startDate, endDate} = req.body

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let eventTest = await Event.findByPk(req.params.eventId)

    if (!eventTest) {
        const err = new Error("Couldn't find an Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    let event = await Event.findByPk(req.params.eventId, {
        include: [{model: Group, include: [{model: Membership, where: {userId: user.id}}]}]
    })
    eventJSON = event.toJSON()

    if (!event.Group) {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }
    let organizerId = eventJSON.Group.organizerId
    let status = eventJSON.Group.Memberships[0].status

    if (!event) {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    if (organizerId !== user.id && status !== 'host' && status !== "co-host") {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    let errors = {}
    if (venueId !== null) {

        if (!venueId) {
            let venueId = "Venue does not exist"
            errors.venueId = venueId
        }

        if (!Number.isInteger(venueId)) {
            let venueId = "Venue does not exist"
            errors.venueId = venueId
        }

        if (Number.isInteger(venueId)) {
            let venue = await Venue.findByPk(venueId)
            if (!venue) {
                const err = new Error(`Couldn't find a Venue with the specified id`)
                err.message = "Venue couldn't be found"
                err.status = 404
                // err.errors = errors
                return next(err)
            }
        }
    }
    if (!name || name.length < 5) {
        let name = "Name must be at least 5 characters"
        errors.name = name
    }
    if (!type || type !== 'Online' && type !== 'In person') {
        let type = "Type must be Online or In person"
        errors.type = type
    }
    if (!capacity || !Number.isInteger(capacity)) {
        let capacity = "Capacity must be an integer"
        errors.capacity = capacity
    }
    if (!price || typeof price !== 'number') {
        let price = "Price is invalid"
        errors.price = price
    }
    if (!description) {
        let description = "Description is required"
        errors.description = description
    }
    if (!startDate || Date.parse(startDate) < Date.now()) {
        let startDate = "Start date must be in the future"
        errors.startDate = startDate
    }
    if (!endDate || Date.parse(endDate) < Date.parse(startDate)) {
        let endDate = "End date is less than start date"
        errors.endDate = endDate
    }

    if (Object.keys(errors).length > 0) {
        const err = new Error('Body validation error')
        err.message = "Validation Error"
        err.status = 400
        err.errors = errors
        return next(err)
    }
    
    if(venueId || venueId === null) event.venueId = venueId
    if(name) event.name = name
    if(type) event.type = type
    if(capacity) event.capacity = capacity
    if(price) event.price = price
    if(description) event.description = description
    if(startDate) event.startDate = startDate
    if(endDate) event.endDate = endDate
    event.save()

    eventResponse = event.toJSON()
    delete eventResponse.Group
    delete eventResponse.updatedAt
    delete eventResponse.createdAt

    return res.json(eventResponse)
})

module.exports = router;
