const express = require("express");
const router = express.Router();
const {
  cancelBooking,
  getCancelledBookings,getCancelledBookingById
} = require("../controllers/bookingCancelController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/cancel/:type/:bookingId", authenticate, cancelBooking);

router.get("/cancelled", authenticate, getCancelledBookings);

// router.get("/cancelled/:id", authenticate, getCancelledBookingById);


module.exports = router; 

