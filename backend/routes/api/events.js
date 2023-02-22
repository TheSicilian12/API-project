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
            { model: Group, attributes: ['id', 'name', 'private', 'city', 'state'] } //add attributes
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
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

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
        include: [{ model: Group, include: [{ model: Membership, where: { userId: user.id } }] }, { model: Attendance }]
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

    // console.log(eventJSON)

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

    if (venueId || venueId === null) event.venueId = venueId
    if (name) event.name = name
    if (type) event.type = type
    if (capacity) event.capacity = capacity
    if (price) event.price = price
    if (description) event.description = description
    if (startDate) event.startDate = startDate
    if (endDate) event.endDate = endDate
    event.save()

    eventResponse = event.toJSON()
    delete eventResponse.Group
    delete eventResponse.updatedAt
    delete eventResponse.createdAt

    return res.json(eventResponse)
})

//ADD AN IMAGE TO AN EVENT BASED ON THE EVENT'S ID
router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    //current user must be attendee, host, or co-host

    //error if event doesn't exist

    const { user } = req
    const { url, preview } = req.body

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //does event exist
    let eventTest = await Event.findByPk(req.params.eventId)
    if (!eventTest) {
        const err = new Error("Couldn't find an Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //find organizerId and status
    let event = await Event.findByPk(req.params.eventId, {
        include: [
            {
                model: Group,
                attributes: ['id', 'organizerId'],
                include: [
                    {
                        model: Membership,
                        attributes: ['id', 'userId', 'groupId', 'status'],
                        where: { userId: user.id }
                    }
                ]
            }
        ],
        attributes: ['id', 'groupId']
    })
    let eventJSON = event.toJSON()

    if (!eventJSON.Group) {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    let organizerId = eventJSON.Group.organizerId
    let status = eventJSON.Group.Memberships[0].status

    let attendance = await Attendance.findOne({
        include: [{
            model: Event,
            where: { id: req.params.eventId }
        }],
        where: { userId: user.id }
    })
    let attendanceJSON = attendance.toJSON()

    if (!attendance) {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    let attendanceStatus = attendanceJSON.status

    // console.log(user.id)
    // console.log(attendanceJSON)
    if (organizerId !== user.id
        && status !== 'host'
        && status !== 'co-host'
        && attendanceStatus !== 'member') {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    let newImage = await EventImage.create({
        eventId: req.params.eventId,
        url,
        preview
    })

    let newImageJSON = newImage.toJSON()

    delete newImageJSON.updatedAt
    delete newImageJSON.createdAt
    delete newImageJSON.eventId


    return res.json(newImageJSON)
})

//DELETE ATTENDANCE TO AN EVENT SPECIFIED BY ID
router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {
    //current user must be organizer, host, or user to be deleted

    //error if no event found

    //error if no attendance found

    //error if not the organizer, host, or user to be deleted

    const { user } = req
    const { userId } = req.body
    let userToDeleteId = userId

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //check event exists
    let eventTest = await Event.findByPk(req.params.eventId)
    if (!eventTest) {
        const err = new Error(`Couldn't find an Event with the specified id`)
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //check attendance exists
    let attendanceTest = await Attendance.findOne({
        where: { userId: userToDeleteId },
        include: [{
            model: Event,
            where: { id: req.params.eventId }
        }]
    })
    if (!attendanceTest) {
        const err = new Error(`Attendance does not exist for this User`)
        err.status = 404
        err.message = "Attendance does not exist for this User"
        return next(err);
    }


    let attendance = await Attendance.findOne({
        where: {
            userId: userToDeleteId
        },
        include: [
            {
                model: Event,
                where: {
                    id: req.params.eventId,
                },
                attributes: ['id'],
                include: [
                    {
                        model: Group,
                        attributes: ['id', 'organizerId']
                    }
                ]
            },
        ]
    })

    let attendanceJSON = JSON.parse(JSON.stringify(attendance))
    console.log(attendanceJSON.Event)
    let organizerId = attendanceJSON.Event.Group.organizerId


    // check if organizer, host, or user to be deleted
    if (organizerId !== user.id && user.id !== userToDeleteId) {
        const err = new Error(`Only the User or organizer may delete an Attendance`)
        err.status = 403
        err.message = "Only the User or organizer may delete an Attendance"
        return next(err);
    }

    await attendance.destroy()

    return res.status(200).json({
        "message": "Successfully deleted attendance from event"
    })
})


//GET ALL ATTENDEES OF AN EVENT SPECIFIED BY ITS ID
router.get('/:eventId/attendees', async (req, res, next) => {
    //if you are the orgnaizer, host, co-host, show all attendees regardless of status
    //if you are not the organizer, host, or co-host show all without status pending

    const { user } = req

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let doesEventExist = await Event.findByPk(req.params.eventId)
    if (!doesEventExist) {
        const err = new Error(`Couldn't find an Event with the specified id`)
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    let event = await Event.findByPk(req.params.eventId, {
        include: [{ model: Group, include: [{ model: Membership, where: { userId: user.id } }] }]
    })
    let eventJSON = event.toJSON()

    if (!eventJSON.Group) {
        const err = new Error(`You are not an authorized user.`)
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    let organizerId = eventJSON.Group.organizerId
    let userStatus = eventJSON.Group.Memberships[0].status

    //organizer, host, or co-host
    if (organizerId === user.id || userStatus === 'host' || userStatus === 'co-host') {
        let attendance = await User.findAll({
            include: [{ model: Event, where: { id: req.params.eventId } }]
        })

        let attendanceJSON = JSON.parse(JSON.stringify(attendance))


        let returnObj = {};
        returnObj.Attendees = [];


        for (let attend of attendanceJSON) {
            returnObj.Attendees.push({
                id: attend.id,
                firstName: attend.firstName,
                lastName: attend.lastName,
                Attendance: {
                    status: attend.Events[0].Attendance.status
                }
            })
        }

        return res.json(returnObj)
    }

    //member or anyone else

    console.log(user)
    let attendance = await User.findAll({
        include: [{ model: Event, where: { id: req.params.eventId } }]
    })

    let attendanceJSON = JSON.parse(JSON.stringify(attendance))


    let returnObj = {};
    returnObj.Attendees = [];


    for (let attend of attendanceJSON) {
        if (attend.Events[0].Attendance.status !== 'pending') {
            returnObj.Attendees.push({
                id: attend.id,
                firstName: attend.firstName,
                lastName: attend.lastName,
                Attendance: {
                    status: attend.Events[0].Attendance.status
                }
            })
        }
    }

    return res.json(returnObj)
})

//DELETE AN EVENT SPECIFIED BY ITS ID
router.delete('/:eventId', requireAuth, async (req, res, next) => {
    //current user must be organizer, host, co-host

    //error event does not exist

    const { user } = req

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //check if event exists
    let eventTest = await Event.findByPk(req.params.eventId)
    if (!eventTest) {
        const err = new Error(`Couldn't find an Event with the specified id`)
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    let event = await Event.findByPk(req.params.eventId, {
        attributes: ['id', 'groupId'],
        include: [
            {
                model: Group,
                attributes: ['id', 'organizerId'],
                include: [
                    {
                        model: Membership,
                        attributes: ['userId', 'status'],
                        where: {
                            userId: user.id
                        }
                    }
                ]
            }
        ]
    })

    // let event = await Event.findByPk(req.params.eventId, {
    //         attributes: ['id', 'groupId'],
    //         include: [
    //             {
    //                 model: Group,
    //                 attributes: ['id', 'organizerId'],
    //                 include: [{model: Membership,
    //                     where: {userId: user.id}
    //                 }
    //             ]
    //             }
    //         ]
    //     })

    let eventJSON = event.toJSON()

    if (!eventJSON.Group) {
        const err = new Error(`You are not an authorized user.`)
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    if (!event.Group) {
        const err = new Error(`You are not an authorized user.`)
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    // check if current user is organizer, host, or co-host
    let organizerId = eventJSON.Group.organizerId
    let status = eventJSON.Group.Memberships[0].status

    console.log(organizerId)
    console.log(status)

    if (organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error(`You are not an authorized user.`)
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    await event.destroy()

    return res.status(200).json({
        "message": "Successfully deleted"
    })
})

//CHANGE THE STATUS OF AN ATTENDNACE FOR AN EVENT SPECIFIED BY ID
//The status of attending instead of member is being used in the docs.
//Dan Chin replied to the question with: "we can think of "member" and "attending" as same thing. we can simply return the status here"
//member is used in the below code.
router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
    // current user must be organizer, host, co-host

    //error event does not exist

    //error if changing attendance to pending

    //error if attendance does not exist

    const { user } = req
    const { userId, status } = req.body
    if (!userId) {
        const err = new Error("userId must be included.");
        err.status = 404
        err.message = "userId must be included."
        return next(err);
    }
    if (!status) {
        const err = new Error("status must be included.");
        err.status = 404
        err.message = "status must be included."
        return next(err);
    }
    let changeStatusTo = status

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //check if event exists
    let eventTest = await Event.findByPk(req.params.eventId)
    if (!eventTest) {
        const err = new Error(`Couldn't find an Event with the specified id`);
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //check pending
    if (changeStatusTo === 'pending') {
        const err = new Error(`If changing the attendance status to "pending".`);
        err.status = 400
        err.message = "Cannot change an attendance status to pending"
        return next(err);
    }

    //check if attendnace exists (for participant to edit)
    let attendanceTest = await Attendance.findOne({
        where: { userId: userId },
        include: [{
            model: Event,
            where: { id: req.params.eventId }
        }]
    })
    if (!attendanceTest) {
        const err = new Error(`If attendance does not exist`);
        err.status = 404
        err.message = "Attendance between the user and the event does not exist"
        return next(err);
    }
    //check if attendance exists (for user)
    let attendanceTestUser = await Attendance.findOne({
        where: { userId: user.id },
        include: [{
            model: Event,
            where: { id: req.params.eventId }
        }]
    })
    if (!attendanceTestUser) {
        const err = new Error(`If attendance does not exist`);
        err.status = 404
        err.message = "Attendance between the user and the event does not exist"
        return next(err);
    }


    //organizerId
    let event = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Group }
        ]
    })
    let eventJSON = event.toJSON()

    let organizerId = eventJSON.Group.organizerId
    let groupId = eventJSON.groupId


    //status
    let membership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: groupId
        }
    })
    if (!membership) {
        const err = new Error(`You are not a member.`);
        err.status = 404
        err.message = "You are not a member."
        return next(err);
    }
    let membershipJSON = membership.toJSON()
    let statusUser = membershipJSON.status

    //check if current user is the organizer, host, co-host
    if (organizerId !== user.id && statusUser !== 'host' && statusUser !== 'co-host') {
        const err = new Error(`You are not authorized.`);
        err.status = 403
        err.message = "You are not authorized."
        return next(err);
    }

    let attendance = await Attendance.findOne({
        where: {
            userId: userId,
            eventId: req.params.eventId
        },
        attributes: ['id', 'eventId', 'userId', 'status']
    })

    attendance.status = changeStatusTo
    await attendance.save()

    //updated at still showed up. So I'm deleting it here.
    let attendanceJSON = attendance.toJSON()
    // delete attendanceJSON.createdAt
    delete attendanceJSON.updatedAt


    return res.json(attendanceJSON)
})

//REQUEST TO ATTEND AN EVENT BASED ON THE EVENT'S ID
router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    //current user must be a member of the group

    //error event doesn't exist

    //error current user already has a pending attendance for the event

    //error current user is already an accepted attendee of the event
    const { user } = req

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //does event exist
    let eventTest = await Event.findByPk(req.params.eventId)
    if (!eventTest) {
        const err = new Error(`Couldn't find an Event with the specified id`);
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //is current user a member of the group
    let memberTest = await Event.findByPk(req.params.eventId, {
        include: [
            {
                model: Group,
                include: [
                    {
                        model: Membership,
                        where: { userId: user.id }
                    }
                ]
            }
        ]
    })
    let eventJSON = memberTest.toJSON()
    if (!eventJSON.Group) {
        const err = new Error(`Not a member of this group`);
        err.status = 404
        err.message = "Not a member of this group"
        return next(err);
    }

    //current user pending or already attending
    let eventAttendanceTest = await Event.findByPk(req.params.eventId, {
        include: [
            {
                model: Attendance,
                where: {
                    userId: user.id
                }
            }
        ]
    })
    if (eventAttendanceTest) {
        let eventAttendanceTestJSON = eventAttendanceTest.toJSON()

        let attendanceStatus = eventAttendanceTestJSON.Attendances[0].status

        //check pending status
        if (attendanceStatus === 'pending') {
            const err = new Error(`Current User already has a pending attendance for the event`);
            err.status = 400
            err.message = "Attendance has already been requested"
            return next(err);
            //I'm not sure about the waitlist status, so I'm just putting waitlist and member together.
        } else {
            const err = new Error(`Current User is already an accepted attendee of the event`);
            err.status = 400
            err.message = "User is already an attendee of the event"
            return next(err);
        }
    }

    let attendanceRequest = await Attendance.create({
        eventId: req.params.eventId,
        userId: user.id,
    })

    let attendanceRequestJSON = attendanceRequest.toJSON()

    delete attendanceRequestJSON.eventId
    delete attendanceRequestJSON.updatedAt
    delete attendanceRequestJSON.createdAt


    return res.status(200).json(attendanceRequestJSON)
})

module.exports = router;
