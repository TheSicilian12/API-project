const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const { User, Group, Membership, GroupImage, Event, Sequelize, sequelize, Venue, Attendance, EventImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const attendance = require('../../db/models/attendance');
const { HostNotFoundError } = require('sequelize');

//EDIT A VENUE SPECIFIED BY ITS ID
router.put('/:venueId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { address, city, state, lat, lng } = req.body

    //Check if there is a user
    if (!user) {
        const err = new Error("You must be logged in.")
        err.status = 404
        err.message = "You must be logged in."
        return next(err);
    }

    //venue with a specified Id
    let venueGeneral = await Venue.findByPk(req.params.venueId)

    if (!venueGeneral) {
        const err = new Error("Couldn't find a Venue with the specified id")
        err.status = 404
        err.message = "Venue couldn't be found"
        return next(err);
    }

    //organizerId
    let venueOrganizerId = await Venue.findByPk(req.params.venueId, {
        include: [
            {model: Group}
        ]
    })
    let venueOrganizerIdJSON = venueOrganizerId.toJSON()
    let organizerId = venueOrganizerIdJSON.Group.organizerId

    // return res.json(venueOrganizerIdJSON)
    //checking authorized users
    let venue = await Venue.findByPk(req.params.venueId, {
        include: [
            { model: Group, include: [{ model: Membership, where: { userId: user.id } }] },
        ]
    })

    let venueJSON = venue.toJSON()

    if (!venueJSON.Group) {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        // err.message = `Forbidden`
        err.message = 'error in the venueJSON.Group'
        return next(err);
    }
    console.log('user: ', user.id)
    console.log('organizerId: ', organizerId)

    let status = venueJSON.Group.Memberships[0].status
    // if (organizerId !== user.id || status !== 'host' || status !== 'co-host') {
    //     const err = new Error(`Require proper authorization`);
    //     err.status = 403
    //     err.message = `Forbidden`
    //     return next(err);
    // }
     if (organizerId !== user.id && status !== 'host' && status !== 'co-host') {
        const err = new Error(`Require proper authorization`);
        err.status = 403
        // err.message = `Forbidden`
        err.message = 'THIS ERROR, HERE!'
        return next(err);
    }


    // st 1   is organizerId then true turned false. whole thing false.
    // st 2   is Host. then true
    // st 3

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
    if (!lat || typeof lat !== 'number') {
        let lat = "Latitude is not valid"
        errors.lat = lat
    }
    if (!lng || typeof lng !== 'number') {
        let lng = "Longitude is not valid"
        errors.lng = lng
    }

    if (Object.keys(errors).length > 0) {
        const err = new Error('Body validation error')
        err.message = "Validation Error"
        err.status = 400
        err.errors = errors
        return next(err)
    }

    if (address) venue.address = address
    if (city) venue.city = city
    if (state) venue.state = state
    if (lat) venue.lat = lat
    if (lng) venue.lng = lng

    await venue.save()

    let returnVenue = venue.toJSON()

    delete returnVenue.createdAt
    delete returnVenue.updatedAt
    delete returnVenue.Group

    return res.json(returnVenue)
})





module.exports = router;
