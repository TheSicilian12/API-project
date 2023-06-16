const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage, Comment } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

//COMMENTS ARE GOT FROM GROUPS

//ADD A COMMENT
router.post('/:eventId/comments', requireAuth, async (req, res, next) => {
    // current user must be logged in

    const {user} = req
    const {eventId} = req.params
    const {comment} = req.body

    // does a current user exist?
    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    // does the event exist?
    let eventTest = await Event.findByPk(eventId)
    if (!eventTest) {
        const err = new Error("Couldn't find an Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    // has the current user already commented?
    let previousCommentTest = await Comment.findOne({
        where: {
            userId: user.id,
            eventId: eventId
        }
    })
    if (previousCommentTest) {
        const err = new Error("A comment already exists");
        err.status = 404
        err.message = "A commente already exists"
        return next(err);
    }

    // Add a comment
    let newComment = await Comment.create({
        eventId: eventId,
        userId: user.id,
        comment: comment
    })

    let newCommentJSON = newComment.toJSON()

    return res.json(newCommentJSON)
})

//EDIT A COMMENT

//DELETE A COMMENT

module.exports = router;
