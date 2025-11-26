const express = require("express");
const router = express.Router();
const {
  createRailwayBooking,
  getAllRailwayBookings,
  getRailwayBookingById,
  deleteRailwayBooking,
} = require("../controllers/bookingRailController");

// Routes
router.post("/create-railway", createRailwayBooking);
router.get("/get-railways", getAllRailwayBookings);
router.get("/get-railway/:id", getRailwayBookingById);
router.delete("/delete-railway/:id", deleteRailwayBooking);

module.exports = router;
