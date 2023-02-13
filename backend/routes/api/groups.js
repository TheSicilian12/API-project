const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Event, Venue, Sequelize, sequelize } = require('../../db/models');
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

//GET ALL GROUPS
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
            { model: Membership },
            { model: GroupImage }
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

//GET ALL GROUPS JOINED OR ORGANIZED BY THE CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    // return res.json(groupObj)

    let tempObj = {};
    tempObj.Groups = [];

    let groupObj = {};
    groupObj.Groups = [];

    let groupTracker = [];

    let currentId = req.user.toJSON().id

    let groups = await Group.findAll({
        include: [
            { model: Membership },
            { model: GroupImage }
        ]
    })


    // json
    for (let group of groups) {
        tempObj.Groups.push(group.toJSON())
    }

    for (let group of tempObj.Groups) {
        if (group.organizerId === currentId) {
            groupTracker.push(group.id)
            group.numMembers = group.Memberships.length

            if (group.GroupImages[0]) {
                group.previewImage = group.GroupImages[0].url
            } else group.previewImage = null;

            groupObj.Groups.push(group)
        }

        for (let member of group.Memberships) {
            // console.log(member.userId)

            if (member.userId === currentId && !groupTracker.includes(member.groupId)) {
                groupTracker.push(member.groupId)
                group.numMembers = group.Memberships.length;

                if (group.GroupImages[0]) {
                    group.previewImage = group.GroupImages[0].url
                } else group.previewImage = null;

                groupObj.Groups.push(group);
            }
        }

        delete group.GroupImages
        delete group.Memberships
        // test;
    }

    return res.json(groupObj)

})

//GET DETAILS OF A GROUP FROM AN ID
router.get('/:groupId', async (req, res, next) => {
    let groupObj = {}
    groupObj.Groups = []
    let currentId = req.params.groupId

    let group = await Group.findOne({
        where: { id: currentId },
        include: [
            { model: Membership },
            { model: GroupImage, attributes: ['id', 'url', 'preview'] },
            { model: Venue, attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'] }
        ]
    })


    if (!group) {
        // const err = new Error('Group does not exist');
        // err.status = 404;
        // err.title = 'Group does not exist';
        // err.message = "Invalid group id";
        // err.errors = ['The provided group id was wrong.'];

        const err = new Error("Couldn't find a Group with the specified id");
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    let organizer = await User.findByPk(group.organizerId)


    groupObj.Groups.push(group.toJSON())

    //add Organizer
    groupObj.Groups[0].Organizer = { id: organizer.dataValues.id, firstName: organizer.dataValues.firstName, lastName: organizer.dataValues.lastName }

    //add numMembers
    groupObj.Groups[0].numMembers = groupObj.Groups[0].Memberships.length;
    delete groupObj.Groups[0].Memberships

    //add previewImage
    // console.log(groupObj.Groups[0].GroupImages[0].url)
    groupObj.Groups[0].previewImage = groupObj.Groups[0].GroupImages[0].url;
    // delete groupObj.Groups[0].GroupImages

    return res.json(groupObj)
})


//CREATE A GROUP
router.post('/', requireAuth, async (req, res) => {
    const { name, about, type, private, city, state } = req.body

    // let group = await Group.create({
    //     organizerId: ,
    //     name,
    //     about,
    //     type,
    //     private,
    //     city,
    //     state
    // })

    return res.json("test")

})


// GET ALL MEMBERS OF A GROUP SPECIFIED BY ITS ID
router.get('/:groupId/members', async (req, res, next) => {
    //find a user
    // const { user } = req;
    // if (user) {

    //     console.log(user)
    //   return res.json({
    //     user: user.toSafeObject()
    //   });
    // } else return res.json({ user: null });

    const { user } = req;

    let group = await Group.findByPk(req.params.groupId, {
        include: [{model: Membership, include: [{model: User}]}]
    })

    if (!group) {
        const err = new Error("Couldn't find a Group with the specified id");
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    let groupJSON = group.toJSON()
    let memberObj = {}
    memberObj.Members = []
    let arrayCounter = 0;

    //identify organizer
    let organizerId = groupJSON.organizerId

    //identify co-host ids
    let coHosts = new Set()
    for (let member of groupJSON.Memberships) {
        if (member.status === 'co-host')
            coHosts.add(member.id)
    }


    //collect all members
    for (let member of groupJSON.Memberships) {
        delete member.User.username

        memberObj.Members.push(
            member.User,
        );
        memberObj.Members[memberObj.Members.length - 1].Membership = {status: member.status};
        // console.log(memberObj.Members[memberObj.Members.length - 1])
    }

    //check if current user is the organizer or co-host, return all members
    if (user.id === organizerId || coHosts.has(user.id)) {
        return res.json(memberObj)
    } else {
    //check if current user is NOT the organizer or co-host, return all members excpet pending
        for (let member of memberObj.Members) {
            // console.log(member)
            if (member.Membership.status === 'pending') {
                memberObj.Members.splice(arrayCounter,1)
            }
            arrayCounter++;
        }
    }

    return res.json(memberObj)
})





module.exports = router;
