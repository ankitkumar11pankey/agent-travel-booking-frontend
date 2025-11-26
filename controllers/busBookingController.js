
const BookingBus = require("../models/bookingBusModel");
const Client = require("../models/clientModel");
const Passenger = require("../models/passengerModel");


exports.createBusBooking = async (req, res) => {

  try {
    
    const {
      clientId,
      busNumber,
      fromStop,
      toStop,
      departureDateTime,
      seatType,
      fare,
      passengerDetails, 
      createdBy
    } = req.body;
    console.log(" Received booking data:", req.body);
    console.log("passengerDetails received:", passengerDetails);
    if (!clientId || !busNumber || !fromStop || !toStop || !departureDateTime) {
      return res.status(400).json({ message: "Required fields missing" });
    }


    const client = await Client.findByPk(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

  
    const finalStatus = req.body.status || "Pending";
    const finalTicketStatus = req.body.ticketStatus || "Pending";

    const booking = await BookingBus.create({
      clientId,
      clientSnapshotName: client.name,
      busNumber,
      fromStop,
      toStop,
      departureDateTime,
      seatType,
      totalPassengers: passengerDetails?.length,
      fare,
      status: finalStatus,
      ticketStatus: finalTicketStatus,
      createdBy,
        bookedBy: req.user.id,
    });




    if (Array.isArray(passengerDetails) && passengerDetails.length > 0) {
      const passengers = passengerDetails.map(p => ({
        bookingId: booking.id,
        type: "bus",
        name: p.name,
        age: p.age,
        gender: p.gender,
      }));
      await Passenger.bulkCreate(passengers);
    }

    const bookingWithDetails = await BookingBus.findByPk(booking.id, {
      include: [
        { model: Client, as: "client", attributes: ["id", "name", "phone", "email"] },
        { model: Passenger, as: "busPassengers", attributes: ["id", "name", "age", "gender"] },
      ],
    });

    res.status(201).json({
      message: "Bus booking created successfully",
      booking: bookingWithDetails,
    });
  } catch (error) {
    console.error("Error creating bus booking:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getAllBusBookings = async (req, res) => {
  try {
    const bookings = await BookingBus.findAll({
      include: [
        { model: Client, as: "client", attributes: ["id", "name", "phone", "email"] },
        { model: Passenger, as: "busPassengers", attributes: ["id", "name", "age", "gender"] }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.getBusBookingById = async (req, res) => {
  try {
    const booking = await BookingBus.findByPk(req.params.id, {
      include: [
        { model: Client, as: "client", attributes: ["id", "name", "phone", "email"] },
        { model: Passenger, as: "busPassengers", attributes: ["id", "name", "age", "gender"] }
      ]
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.deleteBusBooking = async (req, res) => {
  try {
    const result = await BookingBus.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
