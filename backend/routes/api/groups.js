const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Group } = require('../../db/models');
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
    let groups = await Group.findAll()
    return res.json(groups)
})






module.exports = router;
