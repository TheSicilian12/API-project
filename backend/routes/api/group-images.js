const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

//DELETE AN IMAGE FOR AN EVENT
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let imageCheck = await GroupImage.findByPk(req.params.imageId)

    if (!imageCheck) {
        const err = new Error(`Couldn't find an Image with the specified id`);
        err.status = 404
        err.message = "Group Image couldn't be found"
        return next(err);
    }


    let image = await GroupImage.findByPk(req.params.imageId, {
        include: [{model: Group, attributes: ['organizerId'], include: [{model: Membership, attributes: ['userId', 'status'], where: {userId: user.id}}]}]
    })



    if (!image || !image.Group || !image.Group.Memberships) {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    //current user must be organizer, host, or co-host
    let imageJSON = image.toJSON()
    let status = imageJSON.Group.Memberships[0].status
    let organizerId = imageJSON.Group.organizerId

    if (organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error("You are not an authorized user.");
        err.status = 404
        err.message = "You are not an authorized user."
        return next(err);
    }

    await image.destroy();

    return res.status(200).json({
        "message": "Successfully deleted"
      })
})

//testing if image deleted
router.get('/:imageId', async (req, res) => {
    let image = await GroupImage.findByPk(req.params.imageId)

    return res.json(image)
})


module.exports = router;
