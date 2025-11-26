// const BookingUpdate = require("../models/bookingUpdateModel");
// const BookingFlight = require("../models/bookingFlightModel");
// const BookingBus = require("../models/bookingBusModel");
// const BookingRail = require("../models/bookingRailModel");
// const Client = require("../models/clientModel");
// const Passenger = require("../models/passengerModel");


// exports.createBookingUpdate = async (req, res) => {
//   try {
//     const { type, bookingId } = req.params;
//     const {
//       pnrNumber,
//       ticketNumber,
//       previousBalance,
//       amount,
//       ticketType,
//       serviceCharge,
//       totalAmount,
//       dateOfReceiving,
//       paymentMode,
//       paymentAmount,
//       remainingBalance,
//       remarks,
//     } = req.body;

//     const uploadTicket = req.file ? req.file.path : null;

//     let bookingModel;
//     if (type === "flight") bookingModel = BookingFlight;
//     else if (type === "bus") bookingModel = BookingBus;
//     else if (type === "rail") bookingModel = BookingRail;
//     else
//       return res.status(400).json({ message: "Invalid booking type provided" });

//     const booking = await bookingModel.findByPk(bookingId);
//     if (!booking)
//       return res.status(404).json({ message: "Booking not found" });


//     const update = await BookingUpdate.create({
//       bookingId,
//       bookingType: type,
//       pnrNumber,
//       ticketNumber,
//       uploadTicket,
//       previousBalance,
//       amount,
//       ticketType,
//       serviceCharge,
//       totalAmount,
//       dateOfReceiving,
//       paymentMode,
//       paymentAmount,
//       remainingBalance,
//       remarks,
//       updatedBy: req.user.id,
//     });

//     res.status(201).json({ success: true, message: "Booking updated successfully", update });
//   } catch (err) {
//     console.error("Error in booking update:", err);
//     res.status(500).json({ message: "Error updating booking", error: err.message });
//   }
// };


// exports.getBookingDetails = async (req, res) => {
//   try {
//     const { type, bookingId } = req.params;

//     let bookingModel;
//     if (type === "flight") bookingModel = BookingFlight;
//     else if (type === "bus") bookingModel = BookingBus;
//     else if (type === "rail") bookingModel = BookingRail;
//     else return res.status(400).json({ message: "Invalid booking type" });

//     const booking = await bookingModel.findByPk(bookingId, {
//       include: [
//         { model: Client, as: "client" },
//         { model: Passenger, as: `${type}Passengers` },
//       ],
//             order: [["createdAt", "DESC"]],
//     });

//     if (!booking)
//       return res.status(404).json({ message: "Booking not found" });

//     res.status(200).json({ success: true, booking });
//   } catch (err) {
//     console.error("Error fetching booking details:", err);
//     res.status(500).json({ message: "Error fetching booking details", error: err.message });
//   }
// };

 

const BookingUpdate = require("../models/bookingUpdateModel");
const BookingFlight = require("../models/bookingFlightModel");
const BookingBus = require("../models/bookingBusModel");
const BookingRail = require("../models/bookingRailModel");
const Client = require("../models/clientModel");
const Passenger = require("../models/passengerModel");

// exports.createBookingUpdate = async (req, res) => {
//   try {
//     const { type, bookingId } = req.params;
//     console.log('type and bookingId', type, bookingId);
//     const {
//       pnrNumber,
//       ticketNumber,
//       previousBalance,
//       amount,
//       ticketType,
//       serviceCharge,
//       totalAmount,
//       dateOfReceiving,
//       paymentMode,
//       paymentAmount,
//       remainingBalance,
//       remarks,
      
//     } = req.body;

//     const uploadTicket = req.file ? req.file.path : null;

//     let bookingModel;
//     if (type === "flight") bookingModel = BookingFlight;
//     else if (type === "bus") bookingModel = BookingBus;
//     else if (type === "rail") bookingModel = BookingRail;
//     else
//       return res.status(400).json({ message: "Invalid booking type provided" });

//     const booking = await bookingModel.findByPk(bookingId);
//     if (!booking)
//       return res.status(404).json({ message: "Booking not found" });

    
//     let ticketStatus = "Pending";
//     console.log('hhhh', ticketNumber, uploadTicket);
//  if (ticketNumber || uploadTicket) {
//   ticketStatus = "Confirmed";
 
//   await bookingModel.update(
//     { status: "Confirmed", ticketStatus: "Confirmed" },
//     { where: { id: bookingId } }
//   );
// } 
    
// const update = await BookingUpdate.create({
//       bookingId,
//       bookingType: type,
//       pnrNumber,
      
//       ticketNumber,
//       uploadTicket,
//       previousBalance,
//       amount,
//       ticketType,
//       serviceCharge,
//       totalAmount,
//       dateOfReceiving,
//       paymentMode,
//       paymentAmount,
//       remainingBalance,
//       remarks,
//       ticketStatus, 
//       updatedBy: req.user.id,
//     });

//     res
//       .status(201)
//       .json({ success: true, message: "Booking updated successfully", update });
//   } catch (err) {
//     console.error("Error in booking update:", err);
//     res
//       .status(500)
//       .json({ message: "Error updating booking", error: err.message });
//   }
// };

exports.createBookingUpdate = async (req, res) => {
  try {
    const { type, bookingId } = req.params;

    const {
      pnrNumber,
      ticketNumber,
      ticketType,
      serviceCharge,
      totalAmount,
      journeyDate,
      remarks,
      ticketStatus   ,
      // clientId
    } = req.body;
    console.log('req.body', req.body);
    const uploadTicket = req.file ? req.file.path : null;

    let bookingModel;
    if (type === "flight") bookingModel = BookingFlight;
    else if (type === "bus") bookingModel = BookingBus;
    else if (type === "rail") bookingModel = BookingRail;
    else return res.status(400).json({ message: "Invalid booking type" });

    const booking = await bookingModel.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const finalStatus = ticketStatus || "Pending";

    const bookingUpdateAlready = await BookingUpdate.findOne({
      where: { bookingId, bookingType: type },
    });
    const client = await Client.findByPk(booking.clientId);
    if(!client){
      return res.status(404).json({ message: "Client not found" });
    } 
    if(bookingUpdateAlready){
      await BookingUpdate.update({
        pnrNumber,
        journeyDate,
        ticketNumber,
        ticketType,
        serviceCharge,
        totalAmount:req.body.totalAmount,
        uploadTicket,
        remarks,
        ticketStatus: finalStatus,
        updatedBy: req.user.id,
        clientId: booking.clientId
      }, { where: { id: bookingUpdateAlready.id } });
      await bookingModel.update(
        { ticketStatus: finalStatus, totalAmount, pnrNumber },
        { where: { id: bookingId } }
      );
      client.remainingBalance += parseFloat(totalAmount || 0);
      await client.save();
      return res.status(200).json({ message: "booking details updated" });
    }

    const update = await BookingUpdate.create({
      bookingId,
      bookingType: type,
      pnrNumber,
      journeyDate,
      ticketNumber,
      ticketType,
      serviceCharge,
      totalAmount:req.body.totalAmount,
      uploadTicket,
      remarks,
      ticketStatus: finalStatus,
      updatedBy: req.user.id,
      clientId: booking.clientId
    });
    
    await bookingModel.update(
        { ticketStatus: finalStatus, totalAmount, pnrNumber },
        { where: { id: bookingId } }
      );
      client.remainingBalance += parseFloat(totalAmount || 0);
      await client.save();

    res.status(201).json({
      success: true,
      message: "Booking updated successfully",
      update
    });

  } catch (err) {
    console.error("Error in booking update:", err);
    res.status(500).json({
      message: "Error updating booking",
      error: err.message
    });
  }
};


exports.getBookingDetails = async (req, res) => {
  try {
    const { type, bookingId } = req.params;
    
    let bookingModel;
    if (type === "flight") bookingModel = BookingFlight;
    else if (type === "bus") bookingModel = BookingBus;
    else if (type === "rail") bookingModel = BookingRail;
    else return res.status(400).json({ message: "Invalid booking type" });

    const booking = await bookingModel.findByPk(bookingId, {
      include: [
        { model: Client, as: "client" },
        { model: Passenger, as: `${type}Passengers`, where: { type: type }, required: false },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ success: true, booking });
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res
      .status(500)
      .json({ message: "Error fetching booking details", error: err.message });
  }
};
