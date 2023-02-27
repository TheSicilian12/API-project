const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

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
        // console.log(membershipJSON.Memberships[0].status)
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
