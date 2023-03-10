// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupRouter = require('./groups.js');
const eventRouter = require('./events.js');
const venueRouter = require('./venues.js');
const eventImageRouter = require('./event-images.js');
const groupImageRouter = require('./group-images.js');
const { restoreUser } = require('../../utils/auth.js');

// update router and then update the route.

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/groups', groupRouter);

router.use('/events', eventRouter);

router.use('/venues', venueRouter);

router.use('/event-images', eventImageRouter);

router.use('/group-images', groupImageRouter);

//when auth finished comment out
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

//   const { setTokenCookie } = require('../../utils/auth.js');
//   const { User } = require('../../db/models');
//   router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//           username: 'DemoUser'
//         }
//       });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
//   });

//   router.get(
//     '/restore-user',
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );

//   // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;
