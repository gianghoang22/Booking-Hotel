const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;