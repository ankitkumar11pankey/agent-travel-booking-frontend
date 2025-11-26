const express = require("express");
const router = express.Router();
const {
  createFlightBooking,
  getAllFlightBookings,
  getFlightBookingById,
  deleteFlightBooking,
} = require("../controllers/flightBookingController");

// Routes
router.post("/create-flight", createFlightBooking);
router.get("/get-flights", getAllFlightBookings);
router.get("/get-flight/:id", getFlightBookingById);
router.delete("/delete-flight/:id", deleteFlightBooking);

module.exports = router;
