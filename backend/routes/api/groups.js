const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a valid email or username.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a password.'),
//   handleValidationErrors
// ];

router.get('/', async (req, res) => {
    // let groupObj = {}
    // groupObj.Groups = []

    // let groups = await Group.findAll({
    //     include: [{model: Membership}, {model: GroupImage}]
    // })



    // for (let group of groups) {
    //     // console.log(group.GroupImages[0].dataValues.url)
    //     // console.log("-----------")

    //     let item = {};

    //     item.id = group.id
    //     item.organizerId = group.organizerId
    //     item.name = group.name
    //     item.about = group.about
    //     item.type = group.type
    //     item.private = group.private
    //     item.city = group.city
    //     item.state = group.state
    //     item.createdAt = group.createdAt
    //     item.updatedAt = group.updatedAt
    //     item.numMembers = group.Memberships.length
    //     item.previewImage = group.GroupImages[0].dataValues.url

    //     groupObj.Groups.push(item);

    // }

    // return res.json(groupObj)

    // // const numReviews = await Review.count({
    // //     where: { spotId: spot.id }
    // //    })

    //return setup
    let groupObj = {};
    groupObj.Groups = [];

    //main search
    let groups = await Group.findAll({
        attributes: ['id', "organizerId", "name", "about", "type", "private", "city", "state", "createdAt", "updatedAt"],
        include: [
            {model: Membership},
            {model: GroupImage}
        ]
    })

    //json
    for (let group of groups) {
        groupObj.Groups.push(group.toJSON())
    }

    //num members
    for (let group of groupObj.Groups) {
        // console.log(group.Memberships.length)
        // console.log("------------------")
        if (group.Memberships.length) {
            group.numMembers = group.Memberships.length;
        } else group.numMembers = 0;
        delete group.Memberships;
    }

    //preview image add
    for (let group of groupObj.Groups) {
        if (group.GroupImages[0]) {
            group.previewImage = group.GroupImages[0].url
        } else group.previewImage = null;
        delete group.GroupImages;
    }

    res.json(groupObj)

})






module.exports = router;
