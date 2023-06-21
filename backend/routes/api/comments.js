const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage, Comment } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');

//All Comments for an event
router.get('/:eventId', async (req, res, next) => {
    const {user} = req
    const {eventId} = req.params

    // //  does a current user exist?
    //  if (!user) {
    //     const err = new Error("You must be logged in.");
    //     err.status = 404
    //     err.message = "You must be logged in."
    //     return next(err);
    // }

    // does the event exist?
    let eventTest = await Event.findByPk(eventId)
    if (!eventTest) {
        const err = new Error("Couldn't find an Event with the specified id");
        err.status = 404
        err.message = "Event couldn't be found"
        return next(err);
    }

    let comments = await Comment.findAll({
        where: {
            eventId: req.params.eventId
        }
    })

    let returnComments = {}
    // if (comments) returnComments = comments

    for (let comment of comments) {
        returnComments[comment.dataValues.id] = comment.toJSON()

        let user = await User.findByPk(comment.dataValues.userId)

        returnComments[comment.dataValues.id].userInfo = {
            "firstName": user.dataValues.firstName,
            "lastName": user.dataValues.lastName,
            "username": user.dataValues.username
        }
    }
    return res.json(returnComments)
})

//ADD A COMMENT
router.post('/:eventId', requireAuth, async (req, res, next) => {
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
    // let previousCommentTest = await Comment.findOne({
    //     where: {
    //         userId: user.id,
    //         eventId: eventId
    //     }
    // })
    // if (previousCommentTest) {
    //     const err = new Error("A comment already exists");
    //     err.status = 404
    //     err.message = "A commente already exists"
    //     return next(err);
    // }

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
router.put('/edit', requireAuth, async (req, res, next) => {
    const {user} = req
    // const {commentId} = req.params
    const {text, eventId} = req.body

    // does a current user exist?
    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    // let comment = await Comment.findByPk(commentId)
    let comment = await Comment.findOne({
        where: {
            userId: user.id,
            eventId: eventId
        }
    })
    if (!comment) {
        const err = new Error("Couldn't find a comment with the specified id")
        err.message = "Comment couldn't be found"
        err.status = 404
        return next(err)
    }

    if (comment.userId !== user.id) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    if (text) comment.comment = text

    await comment.save()
    return res.json(comment)
})

//DELETE A COMMENT
router.delete('/delete', requireAuth, async (req, res, next) => {
    const {user} = req
    const {eventId} = req.body
    const {commentId} = req.params

    // does a current user exist?
    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    // let comment = await Comment.findByPk(commentId)
    let comment = await Comment.findOne({
        where: {
            userId: user.id,
            eventId: eventId
        }
    })
    if (!comment) {
        const err = new Error("Couldn't find a comment with the specified id")
        err.message = "Comment couldn't be found"
        err.status = 404
        return next(err)
    }

    if (comment.dataValues.userId !== user.id) {
        const err = new Error("Not an authorized user")
        err.message = "Not an authorized user"
        err.status = 404
        return next(err)
    }

    await comment.destroy();

    return res.status(200).json({
        "comment": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
