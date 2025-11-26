const Bus = require("../models/bookingBusModel");
const Flight = require("../models/bookingFlightModel");
const  Railway = require("../models/bookingRailModel");
const User = require("../models/userModel");
const Client = require("../models/clientModel");

exports.getBookingStats = async (req, res) => {
  try {

    const { role, id } = req.user; 
     const condition = role === "agent" ? { createdBy: id } : {};
    let railwayCount, busCount, flightCount;

    if (role === "admin") {
  
      [railwayCount, busCount, flightCount] = await Promise.all([
        Railway.count(),
        Bus.count(),
        Flight.count(),
      ]);
    } else if (role === "agent") {
   
      [railwayCount, busCount, flightCount] = await Promise.all([
      Railway.count({ where: { bookedBy: id } }),
  Bus.count({ where: { bookedBy: id } }),
  Flight.count({ where: { bookedBy: id } }),

      ]);
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json({
      railwayCount,
      busCount,
      flightCount,
      totalBookings: railwayCount + busCount + flightCount,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// exports.getBookingStats = async (req, res) => {
//   try {
//     const { role, id } = req.user; 

//     let flightCount = 0;
//     let railCount = 0;
//     let busCount = 0;

//     if (role === "admin") {
     
//       [flightCount, railCount, busCount] = await Promise.all([
//         Flight.count(),
//         Railway.count(),
//         Bus.count(),
//       ]);
//     } else if (role === "agent") {
    
//       [flightCount, railCount, busCount] = await Promise.all([
//         Flight.count({ where: { bookedBy: id } }),
//         Railway.count({ where: { bookedBy: id } }),
//         Bus.count({ where: { bookedBy: id } }),
//       ]);
//     } else {
//       return res.status(403).json({ message: "Unauthorized access" });
//     }

//     return res.status(200).json({
//       success: true,
//       flightCount,
//       railCount,
//       busCount,
//       totalBookings: flightCount + railCount + busCount,
//     });
//   } catch (err) {
//     console.error("Error fetching dashboard stats:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// };

exports.getAllBookings = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    // const condition = role === "agent" ? { createdBy: userId } : {};
    const condition = role === "agent" ? { bookedBy: userId } : {};


    const [railways, buses, flights] = await Promise.all([
      Railway.findAll({
        where: condition,
       
        include: [{ model: User, as: "bookedByUser", attributes: ["id", "name", "role"] }],
         order: [["createdAt", "DESC"]],
      }),
      Bus.findAll({
        where: condition,
       
        include: [{ model: User, as: "bookedByUser", attributes: ["id", "name", "role"] }],
         order: [["createdAt", "DESC"]],
      }),
      Flight.findAll({
        where: condition,
    
        include: [{ model: User, as: "bookedByUser", attributes: ["id", "name", "role"] }],
         order: [["createdAt", "DESC"]],
      }),
    ]);

    const formatBooking = (booking, type) => ({
      id: booking.id,
      // _id: booking._id,
      type,
      bookingStatus: booking.status,
      ticketStatus: booking.ticketStatus,
      status: booking.status,
      journeyDate:
      booking.departureDateTime || booking.departureDate || booking.journeyDate || null,
      bookedBy: booking.bookedByUser ? booking.bookedByUser.name : "Unknown",
      agentId: booking.createdBy,
      clientName: booking.clientName,
      from: booking.fromStation || booking.fromStop || booking.fromAirport,
      to: booking.toStation || booking.toStop || booking.toAirport,
      totalAmount: booking.totalAmount || 0,
      clientSnapshotName:booking.clientSnapshotName,
    });

    const allBookings = [
      ...railways.map((r) => formatBooking(r, "Railway")),
      ...buses.map((b) => formatBooking(b, "Bus")),
      ...flights.map((f) => formatBooking(f, "Flight")),
    ];

    res.status(200).json({
      success: true,
      total: allBookings.length,
      bookings: allBookings,
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// exports.getAgentBookings = async (req, res) => {
//   try {
//     const { agentId } = req.params;

//     // ✅ Fetch all bookings where bookedBy = agentId (or name, depending on what you store)
//     const railwayBookings = await railwayBookings.findAll({ where: { bookedBy: agentId } });
//     const busBookings = await busBookings.findAll({ where: { bookedBy: agentId } });
//     const flightBookings = await flightBookings.findAll({ where: { bookedBy: agentId } });

//     // ✅ Merge all into one list
//     const allBookings = [
//       ...railwayBookings.map(b => ({ ...b.toJSON(), type: "Railway" })),
//       ...busBookings.map(b => ({ ...b.toJSON(), type: "Bus" })),
//       ...flightBookings.map(b => ({ ...b.toJSON(), type: "Flight" })),
//     ];

//     res.status(200).json({
//       success: true,
//       count: allBookings.length,
//       bookings: allBookings,
//     });
//   } catch (err) {
//     console.error("Error fetching agent bookings:", err);
//     res.status(500).json({ message: "Error fetching agent bookings", error: err.message });
//   }
// };


exports.getAgentBookings = async (req, res) => {
  try {
    const { agentId } = req.params;

  
    const [railwayBookings, busBookings, flightBookings] = await Promise.all([
      Railway.findAll({
        where: { bookedBy: agentId },
        include: [{ model: Client, as: "client", attributes: ["id", "name", "email"] }],
              order: [["createdAt", "DESC"]],
      }),
      Bus.findAll({
        where: { bookedBy: agentId },
        include: [{ model: Client, as: "client", attributes: ["id", "name", "email"] }],
              order: [["createdAt", "DESC"]],
      }),
      Flight.findAll({
        where: { bookedBy: agentId },
        include: [{ model: Client, as: "client", attributes: ["id", "name", "email"] }],
              order: [["createdAt", "DESC"]],
      }),
    ]);

    const allBookings = [
      ...railwayBookings.map(b => ({ ...b.toJSON(), type: "Railway" })),
      ...busBookings.map(b => ({ ...b.toJSON(), type: "Bus" })),
      ...flightBookings.map(b => ({ ...b.toJSON(), type: "Flight" })),
    ];

    res.status(200).json({
      success: true,
      count: allBookings.length,
      bookings: allBookings,
    });
  } catch (err) {
    console.error("Error fetching agent bookings:", err);
    res.status(500).json({ message: "Error fetching agent bookings", error: err.message });
  }
};
