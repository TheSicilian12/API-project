const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Event, Venue, Attendance, EventImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

//GET ALL GROUPS
// router.get('/', async (req, res) => {
//     //return setup
//     let groupObj = {};
//     groupObj.Groups = [];

//     //main search
//     let groups = await Group.findAll({
//         attributes: ['id', "organizerId", "name", "about", "type", "private", "city", "state", "createdAt", "updatedAt"],
//         include: [
//             { model: Membership },
//             { model: GroupImage }
//         ]
//     })

//     //json
//     for (let group of groups) {
//         groupObj.Groups.push(group.toJSON())
//     }

//     //num members
//     for (let group of groupObj.Groups) {
//         // console.log(group.Memberships.length)
//         // console.log("------------------")
//         if (group.Memberships.length) {
//             group.numMembers = group.Memberships.length;
//         } else group.numMembers = 0;
//         delete group.Memberships;
//     }

//     //preview image add
//     for (let group of groupObj.Groups) {
//         if (group.GroupImages[0]) {
//             group.previewImage = group.GroupImages[0].url
//         } else group.previewImage = null;
//         delete group.GroupImages;
//     }

//     res.json(groupObj)

// })
//GET ALL GROUPS
router.get('/', async (req, res) => {



    //main search
    let groups = await Group.findAll({
        attributes: ['id', "organizerId", "name", "about", "type", "private", "city", "state", "createdAt", "updatedAt"],
        include: [
            { model: Membership },
            { model: GroupImage }
        ]
    })

    let groupsJSON = JSON.parse(JSON.stringify(groups))

    let groupObj = {};
    groupObj.Groups = [];

    for (let group of groupsJSON) {


        let numMembers = 0;
        let previewImage = null;

        //number of members in a group
        if (group.Memberships.length > 0) {
            for (let person of group.Memberships) {
                if (person.status === 'member') {
                    numMembers++
                }
            }
        }

        //preview image for a group
        if (group.GroupImages.length > 0) {
            for (let image of group.GroupImages) {
                if (image.preview === true) {
                    previewImage = image.url
                }
            }

        }



        groupObj.Groups.push({
            id: group.id,
            organizerId: group.organizerId,
            name: group.name,
            about: group.about,
            type: group.type,
            private: group.private,
            city: group.city,
            state: group.state,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            numMembers: numMembers,
            preivewImage: previewImage
        })
    }

    res.json(groupObj)

})

//GET ALL GROUPS JOINED OR ORGANIZED BY THE CURRENT USE
router.get('/current', requireAuth, async (req, res) => {
    //groups joined or organized by current user

    const { user } = req

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }
    //KEEP TRACK OF GROUP IDs!
    let groupIdSet = new Set()

    //organized by current user
    let groupsOrganized = await Group.findAll({
        where: { organizerId: user.id }
    })
    //empty string if no groups organized
    let groupsOrganizedJSON = (JSON.parse(JSON.stringify(groupsOrganized)))

    //add to set for groups organized
    if (groupsOrganizedJSON.length > 0) {
        for (let group of groupsOrganizedJSON) {
            if (group.organizerId === user.id) {
                groupIdSet.add(group.id)
            }
        }
    }

    //member of a group
    let membership = await Membership.findAll({
        where: { userId: user.id },
        include: [
            { model: Group }
        ]
    })

    //empty array possible
    let membershipJSON = (JSON.parse(JSON.stringify(membership)))

    //add to set for groups membership exists in
    if (membershipJSON.length > 0) {
        for (let membership of membershipJSON) {
            if (membership.status === 'host' || membership.status === 'co-host' || membership.status === 'member') {
                groupIdSet.add(membership.Group.id)
            }
        }
    }

    // let validGroup;
    //go through each valid group
    //transfer to a temp array cause I'm havving issues with the forEach function
    let groupIdArray = []
    groupIdSet.forEach(
        value => {
            groupIdArray.push(value)
        }
    )

    let groupObj = {}
    groupObj.Groups = []

    //define numMembers outside of the if statement
    let numMembers = 0;

    //just making sure there's actually values in the array
    if (groupIdArray.length > 0) {
        for (let validGroupId of groupIdArray) {
            console.log("current group Id: ", validGroupId)

            let validGroup = await Group.findByPk(validGroupId)
            let validGroupJSON = validGroup.toJSON()

            //find preview image for group
            let previewImageFind = await GroupImage.findOne({
                where: [{ groupId: validGroupId }, { preview: true }]
            })

            let previewImageFindJSON = JSON.parse(JSON.stringify(previewImageFind))

            //is preview true? previewImageFIndJSON set up to find only previews = true
            let previewImage;
            if (previewImageFindJSON) {
                previewImage = previewImageFindJSON.url
            } else previewImage = null


            // console.log(validGroupJSON)

            //number members
            //memberships key will be empty array if no memberships
            let groupMembership = await Group.findByPk(validGroupId, {
                include: [{ model: Membership }]
            })
            let groupMembershipJSON = groupMembership.toJSON()

            //check the existance of members

            if (groupMembershipJSON.Memberships.length > 0) {
                for (let member of groupMembershipJSON.Memberships) {
                    // console.log(member.status)
                    if (member.status === 'host' || member.status === 'co-host' || member.status === 'member') numMembers++
                }
            }

            groupObj.Groups.push({
                id: validGroupJSON.id,
                organizerId: validGroupJSON.organizerId,
                name: validGroupJSON.name,
                about: validGroupJSON.about,
                type: validGroupJSON.type,
                private: validGroupJSON.private,
                city: validGroupJSON.city,
                state: validGroupJSON.state,
                createdAt: validGroupJSON.createdAt,
                updatedAt: validGroupJSON.updatedAt,
                numMembers: numMembers,
                previewImage: previewImage
            })

        }
    }

    return res.json(groupObj)
})



//GET DETAILS OF A GROUP FROM AN ID
router.get('/:groupId', async (req, res, next) => {
    //error if no group exists

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

    let groupJSON = group.toJSON()

    let organizerData = await User.findByPk(group.organizerId)

    let organizerJSON = organizerData.toJSON()
    delete organizerJSON.username;

    // groupObj.Groups.push(group.toJSON())

    //add Organizer
    // groupObj.Groups[0].Organizer = { id: organizer.dataValues.id, firstName: organizer.dataValues.firstName, lastName: organizer.dataValues.lastName }

    //add numMembers
    let numMembers = 0;
    if (groupJSON.Memberships.length > 0) {
        for (let person of groupJSON.Memberships) {
            if (person.status === 'member') {
                numMembers++
            }
        }
    }

    let Organizer = organizerJSON;

    delete groupJSON.Memberships

    return res.json({ ...groupJSON, numMembers, Organizer })
    // return res.json(groupObj.Groups[0])
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
    //current user must be organizer, or co-host
    //mg - or host?
    //assuming organizer, host, co-host
    const { user } = req

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let groupTest = await Group.findByPk(req.params.groupId)
    if (!groupTest) {
        const err = new Error("Couldn't find a Group with the specified id");
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: [{ model: Membership }, { model: Venue, attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'] }]
    })

    groupJSON = group.toJSON()

    //identify organizer
    let organizerId = groupJSON.organizerId

    //identify co-host ids
    let hostsAndCoHosts = new Set()
    for (let member of groupJSON.Memberships) {
        if (member.status === 'co-host' || member.status === 'host')
            hostsAndCoHosts.add(member.id)
    }

    if (user.id === organizerId || hostsAndCoHosts.has(user.id)) {
        let venueObj = {}
        venueObj.Venues = groupJSON.Venues
        return res.json(venueObj)
    } else {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
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
    if (!name || name.length > 60) {
        let name = "Name must be 60 characters or less"
        errors.name = name
    }
    if (!about || about.length < 50) {
        let about = "About must be 50 characters or more"
        errors.about = about
    }
    if (!type || type !== 'Online' && type !== 'In person') {
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
    //group must belong to the current user.
    //mg - organizer and/or host?
    //assuming just oragnizer
    const { user } = req
    const { name, about, type, private, city, state } = req.body

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

    if (group.organizerId !== user.id) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let errors = {}
    if (!name || name.length > 60) {
        let name = "Name must be 60 characters or less"
        errors.name = name
    }
    if (!about || about.length < 50) {
        let about = "About must be 50 characters or more"
        errors.about = about
    }
    if (!type || type !== 'Online' && type !== 'In person') {
        let type = "Type must be 'Online' or 'In person'"
        errors.type = type
    }
    if (!private || private !== true && private !== false) {
        let private = "Private must be a boolean"
        errors.private = private
    }
    // if (city && !city) {
    //     let city = "City is required"
    //     errors.city = city
    // }
    // if (state && !state) {
    //     let state = "State is required"
    //     errors.state = state
    // }
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

    if (name) group.name = name
    if (about) group.about = about
    if (type) group.type = type
    if (private) group.private = private
    if (city) group.city = city
    if (state) group.state = state

    await group.save()

    return res.json(group)
})

//ADD AN IMAGE TO A GROUP BASED ON THE GROUP'S ID
router.post('/:groupId/images', requireAuth, async (req, res, next) => {
    //current user must be the organizer for the group
    //mg - or host?

    const { user } = req
    const { url, preview } = req.body

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: [{ model: GroupImage }]
    })

    //Check if there is a group
    if (!group) {
        const err = new Error("Couldn't find a Group with the specified id")
        err.message = "Group couldn't be found"
        err.status = 404
        return next(err)
    }

    //Check if current user is the organizer of the group
    if (group.organizerId !== user.id) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let newGroupImage = await GroupImage.create({
        groupId: group.id,
        url,
        preview
    })

    let newGroupImageJSON = newGroupImage.toJSON()

    delete newGroupImageJSON.updatedAt
    delete newGroupImageJSON.createdAt
    delete newGroupImageJSON.groupId

    return res.json(newGroupImageJSON)
})

//DELETE A GROUP
router.delete('/:groupId', requireAuth, async (req, res, next) => {
    const { user } = req

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

    if (group.organizerId !== user.id) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    await group.destroy();

    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

//CREATE A NEW VENUE FOR A GROUP SPECIFIED BY ITS ID
router.post('/:groupId/venues', requireAuth, async (req, res, next) => {
    //current user mus tbe the organizer or co-host
    //mg - or host?
    //assuming organizer, host, or co-host

    //error group doesn't exist

    //error body validation failure

    const { user } = req
    const { address, city, state, lat, lng } = req.body

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //does the group exist
    let groupGeneral = await Group.findByPk(req.params.groupId)
    if (!groupGeneral) {
        const err = new Error("Couldn't find a Group with the specified id")
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    //Check for organizer
    let organizerId = groupGeneral.organizerId

    //this is actually checking for membership status
    let status = "test"
    let group = await Group.findByPk(req.params.groupId, {
        include: [{ model: Membership, where: { userId: user.id } }]
    })
    //if membership where userId = user.id does not exist group should not exist as well
    if (group) {
        //Check for host and cohost
        status = group.Memberships[0].status
        // console.log(status)
    }

    if (organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let errors = {}
    if (!address) {
        let address = "Street address is required"
        errors.address = address
    }
    if (!city) {
        let city = "City is required"
        errors.city = city
    }
    if (!state) {
        let state = "State is required"
        errors.state = state
    }
    if (lat !== 0) {
        if (!lat || typeof lat !== 'number' || lat < -90 || lat > 90) {
            let lat = "Latitude is not valid"
            errors.lat = lat
        }
    }
    if (lng !== 0) {
        if (!lng || typeof lng !== 'number' || lng < -180 || lng > 180) {
            let lng = "Longitude is not valid"
            errors.lng = lng
        }
    }

    if (Object.keys(errors).length > 0) {
        const err = new Error('Body validation error')
        err.message = "Validation Error"
        err.status = 400
        err.errors = errors
        return next(err)
    }

    let newVenue = await Venue.create({
        groupId: req.params.groupId,
        address,
        city,
        state,
        lat,
        lng
    })

    let newVenueJSON = newVenue.toJSON()
    delete newVenueJSON.updatedAt
    delete newVenueJSON.createdAt
    return res.json(newVenueJSON)
})

//GET ALL EVENTS OF A GROUP SPECIFIED BY ITS ID
router.get('/:groupId/events', async (req, res, next) => {
    //errors group doesn't exist

    //does group exist
    let groupTest = await Group.findByPk(req.params.groupId)
    if (!groupTest) {
        const err = new Error("Couldn't find a Group with the specified id")
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    let event = await Event.findAll({
        where: { groupId: req.params.groupId },
        include: [
            { model: EventImage },
            { model: Group },
            { model: Venue }
        ]
    })
    let eventJSON = JSON.parse(JSON.stringify(event))
    // console.log(eventJSON)


    let eventObj = {}
    eventObj.Events = []

    for (let event of eventJSON) {


        //format response
        let group = null;
        if (event.Group) {
            group = {
                id: event.Group.id,
                name: event.Group.name,
                city: event.Group.city,
                state: event.Group.state
            }
        }
        // console.log(eventJSON)
        let venue = null;
        if (event.Venue) {
            venue = {
                id: event.Venue.id,
                city: event.Venue.city,
                state: event.Venue.state
            }
        }

        //event preview image
        let previewImage = null
        if (event.EventImages.length > 0) {
            for (let image of event.EventImages) {
                if (image.preview === true) {
                    previewImage = image.url
                }
            }
        }

        //number attending
        let numAttending = 0;
        let attendance = await Attendance.findAll({
            where: { eventId: event.id }
        })
        let attendanceJSON = JSON.parse(JSON.stringify(attendance))

        if (attendanceJSON.length > 0) {
            for (let person of attendanceJSON) {
                if (person.status === 'member' || person.status === "attending") {// I'm not sure if this should just be "member" or also "attending"
                    numAttending++
                }
            }
        }

        eventObj.Events.push({
            id: event.id,
            groupId: event.groupId,
            venueId: event.venueId,
            name: event.name,
            type: event.type,
            startDate: event.startDate,
            endDate: event.endDate,
            numAttending: numAttending,
            previewImage: previewImage,
            Group: group,
            Venue: venue
        })
    }


    return res.json(eventObj)
})

//CREATE AN EVENT FOR A GROUP SPECIFIED BY ITS ID
router.post('/:groupId/events', requireAuth, async (req, res, next) => {
    const { user } = req
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    let groupTest = await Group.findByPk(req.params.groupId)

    if (!groupTest) {
        const err = new Error("Couldn't find a Group with the specified id")
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: [{ model: Membership, where: { userId: user.id } }]
    })

    if (!group) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let groupJSON = group.toJSON()

    let organizerId = groupJSON.organizerId
    let status = groupJSON.Memberships[0].status

    //Check organizerId, host, and co-host valid user
    if (!group || organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    //data needs to exist
    //data needs to meet restrictions
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
                let venueId = "Venue does not exist"
                errors.venueId = venueId
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
    if (!capacity || !Number.isInteger(capacity)) {
        let capacity = "Capacity must be an integer"
        errors.capacity = capacity
    }
    if (!price || typeof price !== 'number') {
        let price = "Price is invalid"
        errors.price = price
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

    let newEvent = await Event.create({
        groupId: group.id,
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate
    })

    let newEventJSON = await newEvent.toJSON()
    delete newEventJSON.updatedAt
    delete newEventJSON.createdAt
    return res.json(newEventJSON)
})

//CHANGE THE STATUS OF A MEMBERSHIP FOR A GROUP SPECIFIED BY ID
router.put('/:groupId/membership', requireAuth, async (req, res, next) => {
    //to change from pending to member
    //current user must be organizer, host, or co-host

    //to change from member to co-host
    //current user must be organizer, host

    //error if changing membership status to pending, can't do that

    //error if user does not exist

    //error group does not exist

    //error membership does not exist

    const { user } = req
    const { memberId, status } = req.body
    if (!memberId) {
        const err = new Error("memberId must be included.");
        err.status = 404
        err.message = "memberId must be included."
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

    //does the status change go to pending
    if (changeStatusTo === 'pending') {
        const err = new Error(` If changing the membership status to "pending".`);
        err.status = 400
        err.message = "Validations Error"
        err.errors = {
            status: "Cannot change a membership status to pending"
        }
        return next(err);
    }

    //does user exist
    let userTest = await User.findByPk(memberId)
    if (!userTest) {
        const err = new Error(`Couldn't find a User with the specified memberId`);
        err.status = 400
        err.message = "Validation Error"
        err.errors = {
            memberId: "User couldn't be found"
        }
        return next(err);
    }

    //does group exist
    let groupTest = await Group.findByPk(req.params.groupId)
    if (!groupTest) {
        const err = new Error(`Couldn't find a Group with the specified id`);
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }
    let groupJSON = groupTest.toJSON()
    let organizerId = groupJSON.organizerId


    //does membership exist
    let membershipTest = await Membership.findOne({
        where: { userId: memberId },
        include: [{
            model: Group,
            where: { id: req.params.groupId }
        }]
    })
    if (!membershipTest) {
        const err = new Error(`If membership does not exist`);
        err.status = 404
        err.message = "Membership between the user and the group does not exits"
        return next(err);
    }
    let membershipTestJSON = membershipTest.toJSON()
    let statusMemberToChange = membershipTestJSON.status

    // if current user is not part of the group an erorr will appear.
    // current membership
    let currentUserMembership = await Membership.findOne({
        where: { userId: user.id },
        include: [{
            model: Group,
            where: { id: req.params.groupId }
        }]
    })
    if (!currentUserMembership) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let currentUserMembershipJSON = currentUserMembership.toJSON()
    let currentStatus = currentUserMembershipJSON.status

    // if (organizerId !== user.id && currentStatus !== 'host' && currentStatus !== 'co-host') {
    //    const err = new Error(`Require proper authorization`);
    // err.status = 403
    // err.message = `Forbidden`
    // return next(err);
    // }

    //status from pending to member, must be organizer, host, or co-host
    if (statusMemberToChange === 'pending' && changeStatusTo === 'member') {
        if (organizerId !== user.id && currentStatus !== 'host' && currentStatus !== 'co-host') {
            const err = new Error(`Require proper authorization`);
            err.status = 403
            err.message = `Forbidden`
            return next(err);
        }
        //status from member to co-host, must be organizer, host
    } else if (statusMemberToChange === 'member' && changeStatusTo === 'co-host') {
        if (organizerId !== user.id && currentStatus !== 'host') {
            const err = new Error(`Require proper authorization`);
            err.status = 403
            err.message = `Forbidden`
            return next(err);
        }
    } else {
        const err = new Error(`This status change is not authorized.`);
        err.status = 404
        err.message = "This status change is not authorized."
        return next(err);
    }

    let member = await Membership.findOne({
        where: { userId: memberId },
        include: [
            {
                model: Group,
                attributes: ['id'],
                where: { id: req.params.groupId }
            }
        ]
    })
    member.status = changeStatusTo
    member.save()

    let memberJSON = member.toJSON()
    memberJSON.memberId = memberId

    delete memberJSON.userId
    delete memberJSON.createdAt
    delete memberJSON.updatedAt
    delete memberJSON.Group

    return res.status(200).json(memberJSON)
})


//DELETE MEMBERSHIP TO A GROUP SPECIFIED BY ID
router.delete('/:groupId/membership', requireAuth, async (req, res, next) => {

    //current user must be host, user whose membership is to be deleted

    //error if no user found with id

    //error if no group

    //error no membership

    const { user } = req
    const { memberId } = req.body
    let memberToDeleteId = memberId

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //check if user to delete exists
    let userTest = await User.findByPk(memberToDeleteId)
    if (!userTest) {
        const err = new Error(`Couldn't find a User with the specified memberId`)
        err.status = 400
        err.message = "Validation Error"
        err.errors = {
            memberId: "User couldn't be found"
        }
        return next(err);
    }

    //check if group exists
    let groupTest = await Group.findByPk(req.params.groupId)
    if (!groupTest) {
        const err = new Error(`Couldn't find a Group with the specified id`)
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }


    //check if membership exists
    let membershipTest = await Membership.findByPk(memberToDeleteId, {
        include: [
            {
                model: Group,
                where: { id: req.params.groupId },
                attributes: ['id', 'organizerId']
            }
        ]
    })
    if (!membershipTest) {
        const err = new Error(`Membership does not exist for this User`)
        err.status = 404
        err.message = "Membership does not exist for this User"
        return next(err);
    }


    let membership = await Membership.findByPk(memberToDeleteId)
    let currentUserMembership = await Membership.findByPk(user.id)

    //check if there is a current user memberhsip
    if (!currentUserMembership) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    let membershipJSON = membership.toJSON()
    let currentUserMembershipJSON = currentUserMembership.toJSON()

    let memberStatus = membershipJSON.status
    let memberUserId = membershipJSON.id
    let currentUserStatus = currentUserMembershipJSON.status

    // console.log(memberStatus)
    console.log(memberUserId)
    console.log(currentUserStatus)


    //check if current user is the host or user whose membership is to be deleted
    if (currentUserStatus !== 'host' && memberUserId !== user.id) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        err.message = `Forbidden`
        return next(err);
    }

    await membership.destroy()

    return res.status(200).json({
        "message": "Successfully deleted membership from group"
    })
})

//REQUEST A MEMBERSHIP FOR A GROUP BASED ON THE GROUP'S ID
router.post('/:groupId/membership', requireAuth, async (req, res, next) => {
    //error group doesn't exist

    //error current user has a pending membership

    //error current user is already an accepted member
    const { user } = req

    if (!user) {
        const err = new Error("You must be logged in.");
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //does group exist
    let groupTest = await Group.findByPk(req.params.groupId)
    if (!groupTest) {
        const err = new Error(`Couldn't find a Group with the specified id`);
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err);
    }

    //current user pending membership or accepted member
    let membershipTest = await Membership.findOne({
        where: {
            groupId: req.params.groupId,
            userId: user.id
        }
    })
    //which means there is a memebership pending or accepted
    if (membershipTest) {
        let membershipJSON = membershipTest.toJSON()

        let status = membershipJSON.status

        if (status === 'pending') {
            const err = new Error(`Current User already has a pending membership for the group`);
            err.status = 400
            err.message = "Membership has already been requested"
            return next(err);
        } else {
            const err = new Error(`Current User is already an accepted member of the group`);
            err.status = 400
            err.message = "User is already a member of the group"
            return next(err);
        }
    }

    let membershipRequest = await Membership.create({
        userId: user.id,
        groupId: req.params.groupId
    })
    let membershipRequestJSON = membershipRequest.toJSON()
    membershipRequestJSON.memberId = membershipRequestJSON.id

    delete membershipRequestJSON.id
    delete membershipRequestJSON.userId
    delete membershipRequestJSON.groupId
    delete membershipRequestJSON.updatedAt
    delete membershipRequestJSON.createdAt


    return res.status(200).json(membershipRequestJSON)
})

module.exports = router;
