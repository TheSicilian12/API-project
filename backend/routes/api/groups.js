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
    // groupObj.Groups[0].previewImage = groupObj.Groups[0].GroupImages[0].url;
    // delete groupObj.Groups[0].GroupImages

    return res.json(groupObj.Groups[0])
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

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: [{ model: Membership, include: [{ model: User }] }]
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
        memberObj.Members[memberObj.Members.length - 1].Membership = { status: member.status };
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
                memberObj.Members.splice(arrayCounter, 1)
            }
            arrayCounter++;
        }
    }

    return res.json(memberObj)
})

//GET ALL VENUES FOR A GROUP SPECIFIED BY ITS ID
router.get('/:groupId/venues', requireAuth, async (req, res, next) => {
    const { user } = req

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: [{ model: Membership }, { model: Venue, attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'] }]
    })
    groupJSON = group.toJSON()

    //identify organizer
    let organizerId = groupJSON.organizerId

    //identify co-host ids
    let coHosts = new Set()
    for (let member of groupJSON.Memberships) {
        if (member.status === 'co-host')
            coHosts.add(member.id)
    }

    if (user.id === organizerId || coHosts.has(user.id)) {
        let venueObj = {}
        venueObj.Venues = groupJSON.Venues
        return res.json(venueObj)
    } else {
        const err = new Error("Couldn't find a Group with the specified id");
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }
})

//CREATE A GROUP
router.post('/', requireAuth, async (req, res, next) => {
    const { user } = req
    const { name, about, type, private, city, state } = req.body

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //checking for errors
    let errors = {}
    if (name.length > 60) {
        let name = "Name must be 60 characters or less"
        errors.name = name
    }
    if (about.length < 50) {
        let about = "About must be 50 characters or more"
        errors.about = about
    }
    if (type !== 'Online' && type !== 'In person') {
        let type = "Type must be 'Online' or 'In person'"
        errors.type = type
    }
    if (private !== true && private !== false) {
        let private = "Private must be a boolean"
        errors.private = private
    }
    if (!city) {
        let city = "City is required"
        errors.city = city
    }
    if (!state) {
        let state = "State is required"
        errors.state = state
    }

    if (Object.keys(errors).length > 0) {
        const err = new Error('Body validation error')
        err.message = "Validation Error"
        err.status = 400
        err.errors = errors
        return next(err)
    }

    organizerId = user.id

    let newGroup = await Group.create({
        organizerId: organizerId,
        name,
        about,
        type,
        private,
        city,
        state
    })


    return res.status(201).json(newGroup)
})

//EDIT A GROUP
router.put('/:groupId', requireAuth, async (req, res, next) => {
    const { user } = req
    const {name, about, type, private, city, state} = req.body

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let group = await Group.findByPk(req.params.groupId)

    if (!group) {
        const err = new Error("Couldn't find a Group with the specified id")
        err.message = "Group couldn't be found"
        err.status = 404
        return next(err)
    }

    if (group.id !== user.id) {
        let err = new Error('Body validation error')
        err.message = "You are not an authorized user."
        err.status = 404
        return next(err)
    }

    let errors = {}
    if (name && name.length > 60) {
        let name = "Name must be 60 characters or less"
        errors.name = name
    }
    if (about && about.length < 50) {
        let about = "About must be 50 characters or more"
        errors.about = about
    }
    if (type && type !== 'Online' && type !== 'In person') {
        let type = "Type must be 'Online' or 'In person'"
        errors.type = type
    }
    if (private && private !== true && private !== false) {
        let private = "Private must be a boolean"
        errors.private = private
    }
    if (city && !city) {
        let city = "City is required"
        errors.city = city
    }
    if (state && !state) {
        let state = "State is required"
        errors.state = state
    }

    if (Object.keys(errors).length > 0) {
        const err = new Error('Body validation error')
        err.message = "Validation Error"
        err.status = 400
        err.errors = errors
        return next(err)
    }

    if (name) group.name = name
    if (about) group.about = about
    if (type) group.type = type
    if (private) group.private = private
    if (city) group.city = city
    if (state) group.state = state

    await group.save()

    return res.json(group)
 })


module.exports = router;
