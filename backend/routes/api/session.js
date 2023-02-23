const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  // check('credential')
  //   .exists({ checkFalsy: true })
  //   .notEmpty()
  //   .withMessage('Please provide a valid email or username.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide a password.'),
  // handleValidationErrors


  //edited to match docs
  //no idea how to make credential to email
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];



// Log in
//not sure hot to allow for the credential to email shift
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.message = "Invalid credentials";
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }


      await setTokenCookie(res, user);

      return res.json({
        user: user.toSafeObject()
      });
    }
  );


// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
  router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
  );




module.exports = router;
