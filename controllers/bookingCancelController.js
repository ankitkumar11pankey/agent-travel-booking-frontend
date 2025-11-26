
// const BookingFlight = require("../models/bookingFlightModel");
// const BookingRailway = require("../models/bookingRailModel");
// const BookingBus = require("../models/bookingBusModel");
// const CancelledBooking = require("../models/cancelledBookingModel");
// const Ledger = require("../models/ledgerModel");
// const BookingUpdate = require("../models/bookingUpdateModel");
// const Client = require("../models/clientModel");


// exports.cancelBooking = async (req, res) => {
//   try {
//     const { type, bookingId } = req.params;
//     const {
//       availableBalance,
//       ticketAmount,
//       serviceChargeBooking,
//       serviceChargeCancellation,
//       totalAmount,
//       paidAmount,
//       remainingAmount,
//       cancellationDate,
//       remarks,
//       refundAmount,
//     } = req.body;

//     let bookingModel;
//     if (type === "bus") bookingModel = BookingBus;
//     else if (type === "rail") bookingModel = BookingRailway;
//     else if (type === "flight") bookingModel = BookingFlight;
//     else return res.status(400).json({ message: "Invalid booking type" });


//     const booking = await bookingModel.findByPk(bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     if (booking.ticketStatus === "Cancelled") {
//       return res.status(400).json({ message: "Booking already cancelled" });
//     }


//     const cancelRecord = await CancelledBooking.create({
//       bookingId,
//       bookingType: type,
//       clientId: booking.clientId,
//       availableBalance,
//       ticketAmount,
//       serviceChargeBooking,
//       serviceChargeCancellation,
//       totalAmount,
//       paidAmount,
//       remainingAmount,
//       cancellationDate,
//       remarks,
//       cancelledBy: req.user.id,
//       companyId: booking.companyId,
//     });

//     await booking.update({ ticketStatus: "Cancelled" });

// await Ledger.create({
//       clientId: booking.clientId,
//       agentId: req.user.id,
//       bookingId,
//       bookingType: type,
//       entryType: "credit",
//       amount: refundAmount,
//       description: `Refund issued for cancelled ${type.toUpperCase()} booking (#${bookingId})`,
//       paymentMode: "Refund to wallet",
//       createdBy: req.user.id,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Booking cancelled successfully",
//       cancelRecord,
//     });
//   } catch (err) {
//     console.error("Error in cancel booking:", err);
//     res.status(500).json({ message: "Error cancelling booking", error: err.message });
//   }
// };



// exports.getCancelledBookings = async (req, res) => {
//   try {
//     const results = await Promise.all([
//       BookingBus.findAll({
//         where: { ticketStatus: "Cancelled" },
//         include: [{ model: Client, as: "client", attributes: ["name"] }],
//       }),
//       BookingRailway.findAll({
//         where: { ticketStatus: "Cancelled" },
//         include: [{ model: Client, as: "client", attributes: ["name"] }],
//       }),
//       BookingFlight.findAll({
//         where: { ticketStatus: "Cancelled" },
//         include: [{ model: Client, as: "client", attributes: ["name"] }],
//       }),
//     ]);

//     const [busBookings, railBookings, flightBookings] = results;

//     const allCancelled = [
//       ...busBookings.map((b) => ({
//         bookingId: b.id,
//         clientName: b.client?.name || "Unknown",
//         type: "Bus",
//         route: `${b.fromStop} - ${b.toStop}`,
//         ticketStatus: b.ticketStatus,
//         totalAmount: b.fare,
//         cancellationDate: b.updatedAt,
//       })),
//       ...railBookings.map((r) => ({
//         bookingId: r.id,
//         clientName: r.client?.name || "Unknown",
//         type: "Rail",
//         route: `${r.fromStation} - ${r.toStation}`,
//         ticketStatus: r.ticketStatus,
//         totalAmount: r.fare,
//         cancellationDate: r.updatedAt,
//       })),
//       ...flightBookings.map((f) => ({
//         bookingId: f.id,
//         clientName: f.client?.name || "Unknown",
//         type: "Flight",
//         route: `${f.fromAirport} - ${f.toAirport}`,
//         ticketStatus: f.ticketStatus,
//         totalAmount: f.fare,
//         cancellationDate: f.updatedAt,
//       })),
//     ];

//     res.status(200).json({
//       success: true,
//       count: allCancelled.length,
//       cancelledBookings: allCancelled,
//     });
//   } catch (error) {
//     console.error("Error fetching cancelled bookings:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };





const BookingFlight = require("../models/bookingFlightModel");
const BookingRailway = require("../models/bookingRailModel");
const BookingBus = require("../models/bookingBusModel");
const CancelledBooking = require("../models/cancelledBookingModel");
const Ledger = require("../models/ledgerModel");
const Client = require("../models/clientModel");

// exports.cancelBooking = async (req, res) => {
//   try {
//     const { type, bookingId } = req.params;
    
//     const {
//       totalAmount,
//       cancellationCharge,
//       serviceChargeCancellation,
//       paidAmount,        
//       cancellationDate,
//       remarks  
//     } = req.body;

//     let bookingModel;
//     if (type === "bus") bookingModel = BookingBus;
//     else if (type === "rail") bookingModel = BookingRailway;
//     else if (type === "flight") bookingModel = BookingFlight;
//     else return res.status(400).json({ message: "Invalid booking type" });

//     const booking = await bookingModel.findByPk(bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     if (booking.ticketStatus === "Cancelled") {
//       return res.status(400).json({ message: "Booking already cancelled" });
//     }


//     // const totalAmount =
//     //   Number(ticketAmount) ;
//     const totalDeduction =
//       Number(cancellationCharge) + Number(serviceChargeCancellation);

//     let refundableAmount = totalAmount - totalDeduction;
//     if (refundableAmount < 0) refundableAmount = 0;

//     const paid = Number(paidAmount);

//     let refundAmount = 0;
//     let remainingAmount = 0;

//     if (paid > refundableAmount) {
//       refundAmount = paid - refundableAmount;
//     } else {
//       remainingAmount = refundableAmount - paid;
//     }


//     const cancelRecord = await CancelledBooking.create({
//       bookingId,
//       bookingType: type,
//       clientId: booking.clientId,


   
//       cancellationCharge,
//       serviceChargeCancellation,

//       totalAmount,
//       paidAmount,
//       totalDeduction,
//       refundableAmount,
//       refundAmount,
//       remainingAmount,

//       cancellationDate,
//       remarks,

//       cancelledBy: req.user.id,
//       companyId: booking.companyId
//     });

 
//     await booking.update({ ticketStatus: "Cancelled" });

//     if (refundAmount > 0) {
//       // Refund back to client (credit)
//       await Ledger.create({
//         clientId: booking.clientId,
//         agentId: req.user.id,
//         bookingId,
//         bookingType: type,
//         entryType: "credit",
//         amount: refundAmount,
//         description: `Refund issued for cancelled ${type.toUpperCase()} booking (#${bookingId})`,
//         paymentMode: "Refund to wallet",
//         createdBy: req.user.id,
//       });
//     }

//     if (remainingAmount > 0) {
//       // Client owes money (debit)
//       await Ledger.create({
//         clientId: booking.clientId,
//         agentId: req.user.id,
//         bookingId,
//         bookingType: type,
//         entryType: "debit",
//         amount: remainingAmount,
//         description: `Pending cancellation charges for ${type.toUpperCase()} booking (#${bookingId})`,
//         paymentMode: "Outstanding Payment",
//         createdBy: req.user.id,
//       });
//     }


//     res.status(201).json({
//       success: true,
//       message: "Booking cancelled successfully",
//       cancelRecord,
//       refundAmount,
//       remainingAmount
//     });

//   } catch (err) {
//     console.error("Error in cancel booking:", err);
//     res.status(500).json({
//       success: false,
//       message: "Error cancelling booking",
//       error: err.message
//     });
//   }
// };


exports.cancelBooking = async (req, res) => {
  try {
    const { type, bookingId } = req.params;

   
    const totalAmount = Number(req.body.totalAmount) || 0;
    const cancellationCharge = Number(req.body.cancellationCharge) || 0;
    const serviceChargeCancellation = Number(req.body.serviceChargeCancellation) || 0;

    const totalDeduction = Number(req.body.totalDeduction) || 0;
    const refundableAmount = Number(req.body.refundableAmount) || 0;

    const paidAmount = Number(req.body.paidAmount) || 0;
    const refundAmount = Number(req.body.refundAmount) || 0;
    const remainingAmount = Number(req.body.remainingAmount) || 0;

    const cancellationDate = req.body.cancellationDate || null;
    const remarks = req.body.remarks || "";

  
    let bookingModel =
      type === "bus"
        ? BookingBus
        : type === "rail"
        ? BookingRailway
        : type === "flight"
        ? BookingFlight
        : null;

    if (!bookingModel) {
      return res.status(400).json({ success: false, message: "Invalid booking type" });
    }

  
    const booking = await bookingModel.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.ticketStatus === "Cancelled") {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }


    const cancelRecord = await CancelledBooking.create({
      bookingId,
      bookingType: type,
      clientId: booking.clientId,

      totalAmount,
      cancellationCharge,
      serviceChargeCancellation,
      totalDeduction,
      refundableAmount,
      paidAmount,
      refundAmount,
      remainingAmount,

      cancellationDate,
      remarks,

      cancelledBy: req.user.id,
      companyId: booking.companyId,
    });

   
    await booking.update({ ticketStatus: "Cancelled" });

    // ---- Ledger Entries ----
    if (refundAmount > 0) {
      await Ledger.create({
        clientId: booking.clientId,
        agentId: req.user.id,
        bookingId,
        bookingType: type,
        entryType: "credit",
        amount: refundAmount,
        description: `Refund issued for cancelled ${type.toUpperCase()} booking (#${bookingId})`,
        paymentMode: "Refund to wallet",
        createdBy: req.user.id,
      });
    }

    if (remainingAmount > 0) {
      await Ledger.create({
        clientId: booking.clientId,
        agentId: req.user.id,
        bookingId,
        bookingType: type,
        entryType: "debit",
        amount: remainingAmount,
        description: `Pending cancellation charges for ${type.toUpperCase()} booking (#${bookingId})`,
        paymentMode: "Outstanding Payment",
        createdBy: req.user.id,
      });
    }

    // Success response
    res.status(201).json({
      success: true,
      message: "Booking cancelled successfully",
      cancelRecord,
    });

  } catch (err) {
    console.error("Error in cancel booking:", err);
    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
      error: err.message,
    });
  }
};

exports.getCancelledBookings = async (req, res) => {
  try {
    const results = await Promise.all([
      BookingBus.findAll({
        where: { ticketStatus: "Cancelled" },
        include: [{ model: Client, as: "client", attributes: ["name"] }],
      }),
      BookingRailway.findAll({
        where: { ticketStatus: "Cancelled" },
        include: [{ model: Client, as: "client", attributes: ["name"] }],
      }),
      BookingFlight.findAll({
        where: { ticketStatus: "Cancelled" },
        include: [{ model: Client, as: "client", attributes: ["name"] }],
      }),
    ]);

    const [busBookings, railBookings, flightBookings] = results;

    const allCancelled = [
      ...busBookings.map((b) => ({
        bookingId: b.id,
        clientName: b.client?.name || "Unknown",
        type: "Bus",
        route: `${b.fromStop} - ${b.toStop}`,
        ticketStatus: b.ticketStatus,
        totalAmount: b.fare,
        cancellationDate: b.updatedAt,
      })),
      ...railBookings.map((r) => ({
        bookingId: r.id,
        clientName: r.client?.name || "Unknown",
        type: "Rail",
        route: `${r.fromStation} - ${r.toStation}`,
        ticketStatus: r.ticketStatus,
        totalAmount: r.fare,
        cancellationDate: r.updatedAt,
      })),
      ...flightBookings.map((f) => ({
        bookingId: f.id,
        clientName: f.client?.name || "Unknown",
        type: "Flight",
        route: `${f.fromAirport} - ${f.toAirport}`,
        ticketStatus: f.ticketStatus,
        totalAmount: f.fare,
        cancellationDate: f.updatedAt,
      })),
    ];

    res.status(200).json({
      success: true,
      count: allCancelled.length,
      cancelledBookings: allCancelled,
    });
  } catch (error) {
    console.error("Error fetching cancelled bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};