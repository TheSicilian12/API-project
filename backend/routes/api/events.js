const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

//GET ALL EVENTS - edited for query
//ADD QUERY FILTERS TO GET ALL EVENTS
router.get('/', async (req, res, next) => {
    //return setup
    let eventObj = {};
    eventObj.Events = [];

    //query
    let query = {
        where: {},
    }
    let pagination = {}

    //search parameters
    //    /events?page=1&size=5
    let { page, size, name, type, startDate } = req.query
    let errors = {}

    //page and size
    //page min = 1, max = 10, default 1
    if (page) {
        let pageNum = parseInt(page)
        // console.log(pageNum)
        //check page min
        if (pageNum === 0) {
            pageNum = 1
        }
        // check if page is an integer
        else if (!pageNum || pageNum < 0) {
            let page = "Page must be greater than or equal to 1"
            errors.page = page
        }
        page = pageNum
        //page max
        if (page > 10) page = 10
        // console.log(page)
    }
    //size min = 1, max = 20, default 20
    if (size) {
        let sizeNum = parseInt(size)
        // console.log(sizeNum)
        //check size min
        if (sizeNum === 0) {
            sizeNum = 1
        }
        // check if size is an integer
        else if (!sizeNum || sizeNum < 0) {
            let size = "Size must be greater than or equal to 1"
            errors.size = size
        }
        size = sizeNum
        //size max
        if (size > 20) size = 20
        // console.log(size)
    }

    //assuming if page or size is sent but not the other than an error should be thrown isntead of a default value set.
    if (page && !size) {
        let size = "Size must be greater than or equal to 1"
        errors.size = size
    }
    if (!page && size) {
        let page = "Page must be greater than or equal to 1"
        errors.page = page
    }
    //setting pagination
    if (page && size) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
        // return res.status(200).json(`${page}, ${size}`)
        // return res.json(pagination)
    }

    //name
    if (name) {
        //check if name is an Integer
        let nameParseInt = parseInt(name)
        if (nameParseInt <= 0 || nameParseInt >= 0) {
            let name = "Name must be a string"
            errors.name = name
        }

        query.where = { name: name, ...query.where }
    }

    //type
    if (type) {
        //check if type is Online or In Person
        if (type !== 'Online' && type !== 'In Person') {
            let type = "Type must be 'Online' or 'In Person'"
            errors.type = type
        }

        query.where = { type: type, ...query.where }
    }

    //startDate
    if (startDate) {
        //check if startDate is a valid datetime
        //time not a concern, just the date.

        // if (new Date(startDate) === 'Invalid Date') {
        //     let startDate = "Start date must be a valid datetime"
        //     errors.startDate = startDate
        // }
        // console.log(startDate)
        // console.log(new Date(startDate))
        // console.log(new Date(startDate) === Invalid)

        // let newDateA = new Date(12-01-22)
        // console.log('A: ', newDateA)
        // console.log(typeof newDateA)
        // let newDateB = new Date('12-1-22')
        // console.log('B: ', newDateB)
        // console.log(typeof newDateB)
        // let newDateC = new Date('01 Dec 2022')
        // console.log('C: ', newDateC)
        // console.log(typeof newDateC)
        // let newDateD = new Date('test')
        // console.log('D: ', newDateD)
        // console.log(typeof newDateD)
        // let newDateE = new Date('123456789')
        // console.log('E: ', newDateE)
        // console.log(typeof newDateE)

        // if (new Date('123456789') === 'Invalid Date') {
        //     return res.json('test')
        // }

        //check if startDate is a valid datetime
        //YYYY-MM-DD
        let startDateArray = startDate.split("-")
        if (startDateArray.length !== 3) {
            let startDate = "Start date must be a valid datetime"
            errors.startDate = startDate
        }
        let year = parseInt(startDateArray[0])
        let month = parseInt(startDateArray[1])
        let day = parseInt(startDateArray[2])


        //possible issues with how months and days work. currently this would be technically
        if (!year || !month || !day || year < 1000 || month < 1 || month > 12 || day < 1 || day > 31) {
            let startDate = "Start date must be a valid datetime"
            errors.startDate = startDate
        }


        query.where = { startDate: startDate, ...query.where }
    }

    if (Object.keys(errors).length > 0) {
        const err = new Error('Query parameter validation errors')
        err.message = "Validation Error"
        err.status = 400
        err.errors = errors
        return next(err)
    }



    //main search
    //with search options it's more likely for nothing to be returned. Look into if an error is needed or not.
    let events = await Event.findAll({
        ...pagination,
        ...query,
        attributes: ["id", "groupId", "venueId", "name", "type", "startDate", "endDate"],
        include: [
            { model: Venue, attributes: ["id", "city", "state"] },
            { model: Group, attributes: ["id", "name", "city", "state"] },
            { model: EventImage, attributes: ['url', 'preview'] },
            { model: Attendance }
        ]
    })
    // let eventJSON = JSON.parse(JSON.stringify(events))






    // for (let e of eventObj.Events) {
    //     // console.log(e.EventImages)
    //     // if (e.EventImages[0]) {
    //     //     e.previewImage = e.EventImages[0].url
    //     // }
    //     // delete e.EventImages
    //     if (e.EventImages.length > 0) {
    //         console.log(e.EventImages)
    //         console.log(e.EventImages.preview)
    //     } else e.previewImage = null

    // }


    // update
    //num attending add
    for (let e of eventObj.Events) {
        if (e.Attendances.length) {
            let count = []
            for (let attend of e.Attendances) {
                // console.log(attend.status)
                if (attend.status === "member" || attend.status === "attending") { // I'm not sure if this should just be "member" or also "attending"
                    count.push(attend)
                }
            }
            e.numAttending = count.length
        } else e.numAttending = 0;
        delete e.Attendances
    }




    for (let event of events) {
        let previewImage = null;
        let numAttending = 0;

        let eventJSON = event.toJSON()



        // console.log(eventJSON.EventImages)
        //identify images
        if (eventJSON.EventImages.length > 0) {


            for (let image of eventJSON.EventImages) {
                if (image.preview === true) {
                    previewImage = image.url
                }
            }

        }

        //count attendances

        if (eventJSON.Attendances.length > 0) {
            // console.log("---------------------------")
            for (let person of eventJSON.Attendances) {
                // console.log(person)
                if (person.status === 'member' || person.status === "attending") {// I'm not sure if this should just be "member" or also "attending"
                    numAttending++
                }
            }
        }


        eventJSON.previewImage = previewImage
        eventJSON.numAttending = numAttending

        delete eventJSON.EventImages
        delete eventJSON.Attendances

        //moving things to the return object
        eventObj.Events.push(eventJSON)
    }

    res.json(eventObj)
})

//GET DETAILS OF AN EVENT SPECIFIED BY ITS ID
router.get('/:eventId', async (req, res, next) => {
    //error event does not exist

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
        if (attendee.status === 'member' || attendee.status === "attending") { //member or attendee?
            numberAttending++
        }
    }

    eventJSON.numAttending = numberAttending;
    delete eventJSON.Attendances

    return res.json(eventJSON)
})

//EDIT AN EVENT SPECIFIED BY ITS ID
router.put('/:eventId', requireAuth, async (req, res, next) => {
    //current user must be organizer, co-host
    //mg - host?
    //assuming organizer, host, and co-host

    //error body validation

    //error venue does not exist

    //error event does not exist
    const { user } = req
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

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

    //find organizerId
    let eventOrganizer = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Group }
        ]
    })
    let eventOrganizerJSON = eventOrganizer.toJSON()

    let organizerId = eventOrganizerJSON.Group.organizerId


    //find status
    let event = await Event.findByPk(req.params.eventId, {
        include: [
            {
                model: Group,
                include: [
                    {
                        model: Membership,
                        where: {
                            userId: user.id
                        }
                    }
                ]
            }
        ]
    })

    eventJSON = event.toJSON()

    //if no member then event.Group will be null
    let status = 'test'
    if (eventJSON.Group) {
        status = eventJSON.Group.Memberships[0].status
        // console.log(status)
    }

    //is this a valid user
    if (organizerId !== user.id && status !== 'host' && status !== "co-host") {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
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
                const err = new Error(` Couldn't find a Venue with the specified id`)
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
    if (!capacity || !Number.isInteger(capacity) || capacity < 1) {
        let capacity = "Capacity must be an integer"
        errors.capacity = capacity
    }
    if (price !== 0) {
        if (!price || typeof price !== 'number' || price < 0) {
            let price = "Price is invalid"
            errors.price = price
        }
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
    if (price || price === 0) event.price = price
    if (description) event.description = description
    if (startDate) event.startDate = startDate
    if (endDate) event.endDate = endDate
    event.save()

    eventResponse = event.toJSON()
    delete eventResponse.Group
    delete eventResponse.Attendances
    delete eventResponse.updatedAt
    delete eventResponse.createdAt

    // return res.json('end of route')
    return res.json(eventResponse)
})

//ADD AN IMAGE TO AN EVENT BASED ON THE EVENT'S ID
router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    //current user must be attendee, host, or co-host
    //mg - assuming organizerId as well

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

    //find organizerId
    let eventGroup = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Group }
        ]
    })
    let eventGroupJSON = eventGroup.toJSON()

    let organizerId = eventGroupJSON.Group.organizerId

    // find status
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

    let status = 'test'
    if (event) {
        let eventJSON = event.toJSON()

        if (eventJSON.Group) {
            status = eventJSON.Group.Memberships[0].status
        }

        //     return res.json(status)
    }
    // console.log(status)

    //find attendance
    let attendance = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Attendance, where: { userId: user.id } }
        ]
    })

    //if statement prevents errors when where does not exist
    let attendanceStatus = 'test';
    if (attendance) {
        let attendanceJSON = attendance.toJSON()
        attendanceStatus = attendanceJSON.Attendances[0].status
    }
    // console.log(attendanceStatus)

    // console.log(user.id)
    // console.log(attendanceJSON)
    if (organizerId !== user.id
        && status !== 'host'
        && status !== 'co-host'
        && attendanceStatus !== 'member'
        && attendanceStatus !== 'attending') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
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
    // console.log(status)
    // console.log(attendanceStatus)
    // return res.json('end of the route')
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

    let groupId = attendanceJSON.Event.Group.id

    //find status
    let membershipTest = await Group.findByPk(groupId, {
        include: [
            {
                model: Membership,
                where: {
                    userId: user.id
                }
            }
        ]
    })

    let status = 'test'
    if (membershipTest) {
        let membershipJSON = membershipTest.toJSON()
        status = membershipTest.Memberships[0].status
    }


    // check if organizer, host, or user to be deleted
    //assuming organizer should be included.
    // console.log(user.id)
    // console.log(userToDeleteId)
    if (organizerId !== user.id && user.id !== userToDeleteId && status !== 'host') {
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

    //does the event exist
    let doesEventExist = await Event.findByPk(req.params.eventId)
    if (!doesEventExist) {
        const err = new Error(`Couldn't find an Event with the specified id`)
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //find organizerId
    let eventGroup = await Event.findByPk(req.params.eventId, {
        include: [{ model: Group }]
    })
    let eventGroupJSON = eventGroup.toJSON()
    let organizerId = eventGroupJSON.Group.organizerId
    // console.log(organizerId)

    //find status
    //group will be null if no members meet the criteria (pretty sure if they don't meet the criteria)
    let event = await Event.findByPk(req.params.eventId, {
        include: [{ model: Group, include: [{ model: Membership, where: { userId: user.id } }] }]
    })
    let eventJSON = event.toJSON()

    let status = "test"
    if (eventJSON.Group) {
        status = eventJSON.Group.Memberships[0].status
    }
    // console.log(status)

    //if no attendance empty array
    let eventAttendee = await Event.findByPk(req.params.eventId, {
        include: [{ model: Attendance }]
    })
    let eventAttendeeJSON = eventAttendee.toJSON()

    let attendeeObj = {}
    attendeeObj.Attendees = []

    //attendances exist
    if (eventAttendeeJSON.Attendances.length > 0) {

        //iterate over all of the attendances
        for (let attend of eventAttendeeJSON.Attendances) {

            //current user organizer, host, or co-host
            if (organizerId === user.id || status === 'host' || status === 'co-host') {
                let user = await User.findByPk(attend.userId)
                let userJSON = user.toJSON()
                // console.log(userJSON)

                attendeeObj.Attendees.push({
                    //I'm not sure if the id is for the attendee id or the user id.
                    //I'm going to assume for the user id.
                    id: attend.userId,
                    firstName: userJSON.firstName,
                    lastName: userJSON.lastName,
                    Attendance: {
                        status: attend.status
                    }
                })

            } else {
                //current user NOT organizer, host, or co-host

                let user = await User.findByPk(attend.userId)
                let userJSON = user.toJSON()
                // console.log(userJSON)

                if (attend.status !== 'pending') {
                    attendeeObj.Attendees.push({
                        //I'm not sure if the id is for the attendee id or the user id.
                        //I'm going to assume for the user id.
                        id: attend.userId,
                        firstName: userJSON.firstName,
                        lastName: userJSON.lastName,
                        Attendance: {
                            status: attend.status
                        }
                    })
                }
            }
        }
    }

    return res.json(attendeeObj)
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

    //find organizerId
    let eventGroup = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Group }
        ]
    })
    let eventGroupJSON = eventGroup.toJSON()

    let organizerId = eventGroupJSON.Group.organizerId
    let groupId = eventGroupJSON.Group.id

    //find status
    //if membership is empty groupMember should be null
    let groupMember = await Group.findByPk(groupId, {
        include: [
            {
                model: Membership,
                where: {
                    userId: user.id
                }
            }
        ]
    })

    let status = 'test'
    if (groupMember) {
        let groupMemberJSON = groupMember.toJSON()
        // console.log(groupMemberJSON.Memberships[0].status)
        status = groupMemberJSON.Memberships[0].status
    }
    // console.log(status)


    // check if current user is organizer, host, or co-host

    // console.log(organizerId)
    // console.log(status)

    if (organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let event = await Event.findByPk(req.params.eventId)

    await event.destroy()

    // return res.json('end of route')
    return res.status(200).json({
        message: "Successfully deleted"
        // statusCode: 200
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
        where: { userId: userId },  //participant
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

    //Initially checking if the current user had an attendance.
    //This does not need to be the case.
    //check if attendance exists (for user)
    // let attendanceTestUser = await Attendance.findOne({
    //     where: { userId: user.id }, //current user
    //     include: [{
    //         model: Event,
    //         where: { id: req.params.eventId }
    //     }]
    // })
    // if (!attendanceTestUser) {
    //     const err = new Error(`If attendance does not exist`);
    //     err.status = 404
    //     err.message = "Attendance between the user and the event does not exist"
    //     return next(err);
    // }


    //organizerId
    let event = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Group }
        ]
    })
    let eventJSON = event.toJSON()

    let organizerId = eventJSON.Group.organizerId
    let groupId = eventJSON.groupId


    //find status
    let membership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: groupId
        }
    })
    let statusUser = 'test'
    if (membership) {
        let membershipJSON = membership.toJSON()
        statusUser = membershipJSON.status
    }


    //check if current user is the organizer, host, co-host
    if (organizerId !== user.id && statusUser !== 'host' && statusUser !== 'co-host') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
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

    //find organizerId
    let eventOrganizer = await Event.findByPk(req.params.eventId, {
        include: [{ model: Group }]
    })
    let eventOrganizerJSON = eventOrganizer.toJSON()

    let organizerId = eventOrganizerJSON.Group.organizerId




    //is current user a member of the group
    //find status
    //group should be null if membership value is false
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
    let memberJSON = await memberTest.toJSON()

    let status = 'test'
    if (memberJSON.Group) {
        status = memberJSON.Group.Memberships[0].status
    }
    // console.log(status)

    //check if a member of the group
    //not a member of the group
    // console.log(status)
    if (organizerId !== user.id && status !== 'host' && status !== 'co-host' && status !== 'member') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    //find attendStatus
    //current user pending or already attending event
    //null if no attendance and will error out toJSON()
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

    let attendStatus = 'test'
    //if this exists attendStatus will retrieved
    if (eventAttendanceTest) {

        let eventAttendanceJSON = eventAttendanceTest.toJSON()

        // console.log("attendance exists")
        attendStatus = eventAttendanceJSON.Attendances[0].status
        // console.log(attendStatus)
    }

    //check if attendance already exists
    if (attendStatus !== 'test') {
        //I'm not sure about waitlist so I'm putting it with pending
        if (attendStatus === 'pending' || attendStatus === 'waitlist') {
            const err = new Error(`Current User already has a pending attendance for the event`);
            err.status = 400
            err.message = "Attendance has already been requested"
            return next(err);
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

    // return res.json('end of the route')
    return res.status(200).json(attendanceRequestJSON)
})


module.exports = router;
