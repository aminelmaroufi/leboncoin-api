/**
 * Module dependencies.
 */
const booking = require('../controllers/booking.server.controller');

module.exports = {
  prefix: '/leboncoin/bookings',
  routes: [
    {
      path: '/',
      methods: {
        get: {
          parents: ['bookings:main'],
          middlewares: [booking.search],
          iam: 'bookings:search',
        },
      },
    },
  ],
};
