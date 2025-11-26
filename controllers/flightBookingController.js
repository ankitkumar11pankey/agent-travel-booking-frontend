
const BookingFlight = require("../models/bookingFlightModel");
const Client = require("../models/clientModel");
const Passenger = require("../models/passengerModel");



exports.createFlightBooking = async (req, res) => {
  try {
    const {
      clientId,
      flightNumber,
      fromAirport,
      toAirport,
      departureDateTime,
      travelClass, 
      fare,
      passengerDetails,
      passengers, 
      createdBy,
      clientSnapshotName,
    } = req.body;

    if (!clientId || !flightNumber || !fromAirport || !toAirport || !departureDateTime) {
      return res.status(400).json({ message: "Required fields missing" });
    }


    const passengerList = passengerDetails || passengers || [];

 
    const booking = await BookingFlight.create({
      clientId,
      clientSnapshotName: clientSnapshotName || null,
      flightNumber,
      fromAirport,
      toAirport,
      departureDateTime,
      travelClass,
      airline,
      totalPassengers: passengerList.length || 1,
      fare,
      status: req.body.status || "Pending",
      ticketStatus: req.body.ticketStatus || "Pending",
      createdBy,
   bookedBy: req.user.id,
    });


    if (passengerList.length > 0) {
      const passengerData = passengerList.map((p) => ({
        bookingId: booking.id,
        type: "flight",
        name: p.name,
        age: p.age,
        gender: p.gender,
      }));
      await Passenger.bulkCreate(passengerData);
    }


    const bookingWithDetails = await BookingFlight.findByPk(booking.id, {
      include: [
        { model: Client, as: "client", attributes: ["id", "name", "phone", "email","notes"] },
        { model: Passenger, as: "flightPassengers", attributes: ["id", "name", "age", "gender"] },
      ],
    });

    res.status(201).json({
      message: " Booking created successfully for flight",
      booking: bookingWithDetails,
    });
  } catch (error) {
    console.error("Error creating flight booking:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAllFlightBookings = async (req, res) => {
  try {
    const bookings = await BookingFlight.findAll({
      include: [
        { model: Client, as: "client", attributes: ["id", "name", "phone", "email","notes"] },
        { model: Passenger, as: "flightPassengers", attributes: ["id", "name", "age", "gender"] }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.getFlightBookingById = async (req, res) => {
  try {
    const booking = await BookingFlight.findByPk(req.params.id, {
      include: [
        { model: Client, as: "client", attributes: ["id", "name", "phone", "email"] },
        { model: Passenger, as: "flightPassengers", attributes: ["id", "name", "age", "gender"] }
      ]
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFlightBooking = async (req, res) => {
  try {
    const result = await BookingFlight.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
