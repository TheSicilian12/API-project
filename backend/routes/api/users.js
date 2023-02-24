const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  // check('email')
  //   .exists({ checkFalsy: true })
  //   .isEmail()
  //   .withMessage('Please provide a valid email.'),
  // check('username')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 4 })
  //   .withMessage('Please provide a username with at least 4 characters.'),
  // check('username')
  //   .not()
  //   .isEmail()
  //   .withMessage('Username cannot be an email.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage('Password must be 6 characters or more.'),
  // handleValidationErrors

  //update to better reflect the docs
  // check('email')
  //   .exists({ isUnique: true })
  //   .isEmail()
  //   .withMessage("test"),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors
];




// Sign up
// router.post(
//   '/',
//   validateSignup,
//   async (req, res) => {
//     const { email, password, username, firstName, lastName } = req.body;
//     const user = await User.signup({ email, username, password, firstName, lastName });

//     await setTokenCookie(res, user);

//     return res.json({
//       user: user.toSignUpReturn()
//     });
//   }
// );

//Sign up edit
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

    // let test = await User.findOne()
    // return res.json(test.email)

    let userEmailTest = await User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
      where: { email: email }
    })
    //does email already exist?
    if (userEmailTest) {
      const err = new Error('User already exists with the specified email')
      err.message = "User already exists"
      err.status = 403
      err.errors = {
        email: "User with that email already exists"
      }
      return next(err)
    }

    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    // return res.json({
    //   user: user.toSignUpReturn()
    // });
    let userId = { id: user.id }

    return res.json({ ...userId, ...user.toSignUpReturn() })
  }
);





module.exports = router;
