const express = require("express");
const router = express.Router();
const {
  createBusBooking,
  getAllBusBookings,
  getBusBookingById,
  deleteBusBooking,
} = require("../controllers/busBookingController");

// Routes
router.post("/create-bus", createBusBooking);
router.get("/get-buses", getAllBusBookings);
router.get("/get-bus/:id", getBusBookingById);
router.delete("/delete-bus/:id", deleteBusBooking);

module.exports = router;
