const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

// EDIT AN EVENT PREVIEW IMAGE
router.put('/:eventId/images', requireAuth, async (req, res, next) => {
    console.log("-------------------edit event preview image------------------")
    const {user} = req
    const {url} = req.body

    const eventId = req.params.eventId

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //does event exist
    let eventTest = await Event.findByPk(eventId)
    if (!eventTest) {
        const err = new Error("Couldn't find an Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    //find organizerId
    let eventGroup = await Event.findByPk(eventId, {
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

    let image = await EventImage.findOne({
        where: {
            eventId: eventId
        }
    })
    image.url = url
    image.save()

    console.log("-------------image: ", image)

    return res.status(200).json("successfully edited image")

})

//DELETE AN IMAGE FOR AN EVENT
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    //current user must be organizer or co-host
    //mg - or host?
    //assuming organizer, host, or co-host

    const { user } = req;

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //does the image exist
    let imageCheck = await EventImage.findByPk(req.params.imageId)

    if (!imageCheck) {
        const err = new Error(`Couldn't find an Image with the specified id`);
        err.status = 404
        err.message = "Event Image couldn't be found"
        return next(err);
    }


    // let image = await EventImage.findByPk(req.params.imageId, {
    //     include: [{ model: Event, attributes: ['id'], include: [{ model: Group, attributes: ['organizerId'], include: [{ model: Membership, attributes: ['userId', 'status'], where: { userId: user.id } }] }] }]
    // })

    //find organizerId
    let imageGroup = await EventImage.findByPk(req.params.imageId, {
        include: [
            {model: Event,
                include: [
                    {model: Group}
                ]
            }
        ]
    })
    let imageGroupJSON = imageGroup.toJSON()

    let organizerId = imageGroupJSON.Event.Group.organizerId
    let groupId = imageGroupJSON.Event.Group.id


    //find status
    //if no membership then membership should return null
    let membership = await Group.findByPk(groupId, {
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
    if (membership) {
        let membershipJSON = membership.toJSON()
        status = membershipJSON.Memberships[0].status
    }

    //current user must be organizer, host, or co-host
    if (organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let image = await EventImage.findByPk(req.params.imageId)

    await image.destroy();

    // return res.json('end of route')
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

// testing if image deleted
// router.get('/:imageId', async (req, res) => {
//     let image = await EventImage.findAll()

//     return res.json(image)
// })


module.exports = router;
