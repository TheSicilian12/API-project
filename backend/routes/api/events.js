const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res) => {

    let eventObj = {}
    eventObj.Events = []

    let events = await Event.findAll({
        include: [{model: Group}]
    })

    for (let event of events) {
        let item = {};

        item.id = event.id
        item.groupId = event.groupId
        item.venueId = event.venueId
        item.name = event.name
        item.type = event.type
        item.startDate = event.startDate
        item.endDate = event.endDate
        item.numAttending = event.numAttending
        item.previewImage = event.previewImage
        item.Group = {};
        item.Group.id = event.Group.dataValues.id;
        // console.log(event.Group.dataValues.id)
        // console.log("----------------")
        item.Group.name = event.Group.dataValues.name;
        item.Group.city = event.Group.dataValues.city;
        item.Group.state = event.Group.dataValues.state;

        eventObj.Events.push(item)
        console.log(event)
    }

    return res.json(eventObj)
})



module.exports = router;
