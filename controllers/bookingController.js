const { Op } = require("sequelize");
const Client = require("../models/clientModel");
const BookingBus = require("../models/bookingBusModel");
const BookingFlight = require("../models/bookingFlightModel");
const BookingRail = require("../models/bookingRailModel");
const Passenger = require("../models/passengerModel");
const Ledger = require("../models/ledgerModel");
const Company = require("../models/companyModel");
const BookingUpdate = require("../models/bookingUpdateModel");

exports.createBooking = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not logged in" });
    }
    const { client, booking, type, createdBy } = req.body;
    if (!client || !booking || !type) {
      return res.status(400).json({ message: "Required data missing" });
    }

    let clientRecord = await Client.findOne({
      where: { name: client.name, phone: client.phone },
    });

    if (!clientRecord) {
      clientRecord = await Client.create({ ...client, createdBy });
    } else {
      console.log(" Existing client found:", clientRecord.dataValues);
    }

    const clientId = clientRecord.id;
    const clientSnapshotName = client.name;

    let companyRecord = null;

    if (booking.company && booking.company.name) {
      companyRecord = await Company.findOne({
        where: {
          name: booking.company.name,
          gstNumber: booking.company.gstNumber || null,
        },
      });

      if (!companyRecord) {
        companyRecord = await Company.create({
          name: booking.company.name,
          alias: booking.company.alias || null,
          gstNumber: booking.company.gstNumber || null,
          panNumber: booking.company.panNumber || null,
          contactPerson: booking.company.contactPerson || null,
          phone: booking.company.phone || null,
          email: booking.company.email || null,
          addressLine1: booking.company.addressLine1 || null,
          city: booking.company.city || null,
          state: booking.company.state || null,
          postalCode: booking.company.postalCode || null,
          country: booking.company.country || "India",
          bankName: booking.company.bankName || null,
          bankAccountNumber: booking.company.bankAccountNumber || null,
          ifsc: booking.company.ifsc || null,
          commissionPercent: booking.company.commissionPercent || 0,
          settlementCycle: booking.company.settlementCycle || "Monthly",
          createdBy: req.user.id,
        });
        console.log(" New company created:", companyRecord.dataValues);
      } else {
        console.log("Existing company found:", companyRecord.dataValues);
      }
    }

    const companyId = companyRecord ? companyRecord.id : null;

    let bookingRecord;

    if (type === "bus") {
      console.log(" Creating Bus Booking with data:", booking);
      bookingRecord = await BookingBus.create({
        clientId,
        clientSnapshotName,
        createdBy,
        busNumber: booking.busNumber,
        fromStop: booking.fromStop,
        toStop: booking.toStop,
        departureDateTime: booking.departureDateTime,
        seatType: booking.seatType,
        totalPassengers: booking.passengers?.length || 1,

        bookedBy: req.user.id,
        companyType: booking.companyType,
        busType: booking.busType,
        seatNumber: booking.seatNumber,
        companyId,
      });
    } else if (type === "flight") {
      console.log(" Creating Flight Booking with data:", booking);
      bookingRecord = await BookingFlight.create({
        clientId,
        clientSnapshotName,
        createdBy,
        flightNumber: booking.flightNumber,
        fromAirport: booking.fromAirport,
        toAirport: booking.toAirport,
        airline: booking.airline,
        departureDateTime: booking.departureDateTime,
        travelClass: booking.travelClass,
        totalPassengers: booking.passengers?.length || 1,

        bookedBy: req.user.id,
        companyId,
      });
    } else if (type === "rail") {
      console.log(" Creating Rail Booking with data:", booking);
      bookingRecord = await BookingRail.create({
        clientId,
        clientSnapshotName,
        createdBy,
        trainNumber: booking.trainNumber,
        trainName: booking.trainName,
    
        classType: booking.classType,
        fromStation: booking.fromStation,
        toStation: booking.toStation,
        departureDate: booking.departureDate,
        totalPassengers: booking.passengers?.length || 1,

        bookedBy: req.user.id,
        companyId,
      });
    } else {
      return res.status(400).json({ message: "Invalid booking type" });
    }

    console.log(" Booking Record Created:", bookingRecord.dataValues);

    if (bookingRecord && bookingRecord.id) {
      await Passenger.destroy({ where: { bookingId: bookingRecord.id, type } });
    } else {
      console.log(" Skipping passenger deletion: bookingRecord.id undefined");
    }

    if (booking.passengers && booking.passengers.length > 0) {
      console.log(" Passenger Details to Save:", booking.passengers);
      const passengerData = booking.passengers.map((p) => ({
        bookingId: bookingRecord.id,
        type,
        name: p.name,
        age: p.age,
        gender: p.gender,
      }));
      console.log(" Final Passenger Data Before Save:", passengerData);
      await Passenger.bulkCreate(passengerData);
      console.log(" Passenger Records Created Successfully");
    } else {
      console.log(" No passengers provided in request");
    }

    try {
      await Ledger.create({
        clientId: clientRecord.id,
        companyId: bookingRecord.companyId || null,
        agentId: req.user.id,
        bookingId: bookingRecord.id,
        bookingType: type,
        entryType: "Debit",
        description: `Booking created for ${type.toUpperCase()} - ${
          client.name
        }`,
        amount: booking.fare,
        paymentMode: req.body.paymentMode || "cash",
        createdBy: req.user.id,
      });
      console.log("Ledger entry created successfully");
    } catch (ledgerErr) {
      console.error(" Failed to create ledger entry:", ledgerErr.message);
    }

    res.status(201).json({
      message: `Booking created successfully for ${type}`,
      booking: bookingRecord,
    });
  } catch (error) {
    console.error(" Error in createBooking Controller:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { client, booking } = req.body;

    if (!client || !booking) {
      return res.status(400).json({ message: "Missing data" });
    }

    let BookingModel;

    if (type === "bus") BookingModel = BookingBus;
    else if (type === "rail") BookingModel = BookingRail;
    else if (type === "flight") BookingModel = BookingFlight;
    else return res.status(400).json({ message: "Invalid booking type" });

    const bookingRecord = await BookingModel.findByPk(id);

    if (!bookingRecord) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Client.update(
      {
        name: client.name,
        phone: client.phone,
        email: client.email,
        address: client.address,
      },
      { where: { id: bookingRecord.clientId } }
    );

    const updatedBooking = await bookingRecord.update({
      ...booking,
      clientSnapshotName: client.name,
    });

    if (booking.passengers && booking.passengers.length > 0) {
      await Passenger.destroy({ where: { bookingId: id, type: type } });
      const passengersFormatted = booking.passengers.map((p) => ({
        bookingId: id,
        type: type,
        name: p.name,
        age: p.age,
        gender: p.gender,
      }));

      await Passenger.bulkCreate(passengersFormatted);
    }

    if (booking.totalAmount) {
      await Ledger.update(
        { amount: booking.totalAmount },
        {
          where: {
            bookingId: id,
            bookingType: type,
          },
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.searchClients = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const terms = query.split(" ").filter(Boolean);

    const searchConditions = terms.map((term) => ({
      [Op.or]: [
        { name: { [Op.like]: `%${term}%` } },
        { phone: { [Op.like]: `%${term}%` } },
      ],
    }));

    const clients = await Client.findAll({
      where: { [Op.and]: searchConditions },
      limit: 10,
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error(" Error searching clients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getConfirmedBookings = async (req, res) => {
//   try {

//     const results = await Promise.all([
//       BookingBus.findAll({
//         where: { status: "Confirmed" },
//         include: [{ model: Client, as: "client", attributes: ["name"] }],
//       }),
//       BookingRail.findAll({
//         where: { status: "Confirmed" },
//         include: [{ model: Client, as: "client", attributes: ["name"] }],
//       }),
//       BookingFlight.findAll({
//         where: { status: "Confirmed" },
//         include: [{ model: Client, as: "client", attributes: ["name"] }],
//       }),
//     ]);

//     const [busBookings, railBookings, flightBookings] = results;

//     const allBookings = [
//       ...busBookings.map((b) => ({
//         bookingId: b.id,
//         clientName: b.client?.name || "Unknown",
//         type: "Bus",
//         route: b.fromStop && b.toStop ? `${b.fromStop} - ${b.toStop}` : (b.route || "N/A"),
//         ticketStatus: b.status,
//         amount: b.fare ?? null,
//         totalAmount: b.totalAmount ?? null,
//         bookingDate: b.createdAt,
//       })),
//       ...railBookings.map((r) => ({
//         bookingId: r.id,
//         clientName: r.client?.name || "Unknown",
//         type: "Rail",
//         route: r.fromStation && r.toStation ? `${r.fromStation} - ${r.toStation}` : (r.route || "N/A"),
//         ticketStatus: r.status,
//         amount: r.fare ?? null,
//         totalAmount: r.totalAmount ?? null,
//         bookingDate: r.createdAt,
//       })),
//       ...flightBookings.map((f) => ({
//         bookingId: f.id,
//         clientName: f.client?.name || "Unknown",
//         type: "Flight",
//         route: f.fromAirport && f.toAirport ? `${f.fromAirport} - ${f.toAirport}` : (f.route || "N/A"),
//         ticketStatus: f.status,
//         amount: f.fare ?? null,
//         totalAmount: f.totalAmount ?? null,
//         bookingDate: f.createdAt,
//       })),
//     ];

//     return res.status(200).json({
//       success: true,
//       count: allBookings.length,
//       bookings: allBookings,
//     });
//   } catch (error) {
//     console.error("Error fetching confirmed bookings:", error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

exports.getConfirmedBookings = async (req, res) => {
  try {
    const results = await Promise.all([
      BookingUpdate.findAll(),
      BookingBus.findAll({
        where: {
          [Op.or]: [{ ticketStatus: "Confirmed" }, { ticketStatus: "Waiting" }],
        },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["name"],
          },
        ],
      }),
      BookingRail.findAll({
        where: {
          [Op.or]: [{ ticketStatus: "Confirmed" }, { ticketStatus: "Waiting" }],
        },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["name"],
          },
        ],
      }),
      BookingFlight.findAll({
        where: {
          [Op.or]: [{ ticketStatus: "Confirmed" }, { ticketStatus: "Waiting" }],
        },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["name"],
          },
        ],
      }),
    ]);

    const [bookingUpdate, busBookings, railBookings, flightBookings] = results;

    const allBookings = [
      ...busBookings.map((b) => ({
        bookingId: b.id,
        clientName: b.client?.name || "Unknown",
        type: "Bus",
        pnrNumber: b.pnrNumber || "N/A",
        journeyDate:
          bookingUpdate.find(
            (j) => j.bookingId === b.id && j.bookingType === "bus"
          )?.journeyDate || "N/A",
        route:
          b.fromStop && b.toStop
            ? `${b.fromStop} - ${b.toStop}`
            : b.route || "N/A",
        ticketStatus: b.ticketStatus,
        amount: b.totalAmount ?? null,
        totalAmount: b.totalAmount ?? null,
        bookingDate: b.createdAt,
      })),
      ...railBookings.map((r) => ({
        bookingId: r.id,
        clientName: r.client?.name || "Unknown",
        type: "Rail",
        pnrNumber: r.pnrNumber || "N/A",
        journeyDate:
          bookingUpdate.find(
            (j) => j.bookingId === r.id && j.bookingType === "rail"
          )?.journeyDate || "N/A",
        route:
          r.fromStation && r.toStation
            ? `${r.fromStation} - ${r.toStation}`
            : r.route || "N/A",
        ticketStatus: r.ticketStatus,
        amount: r.totalAmount ?? null,
        totalAmount: r.totalAmount ?? null,
        bookingDate: r.createdAt,
      })),
      ...flightBookings.map((f) => ({
        bookingId: f.id,
        clientName: f.client?.name || "Unknown",
        type: "Flight",
        pnrNumber: f.pnrNumber || "N/A",
        journeyDate:
          bookingUpdate.find(
            (j) => j.bookingId === f.id && j.bookingType === "flight"
          )?.journeyDate || "N/A",
        route:
          f.fromAirport && f.toAirport
            ? `${f.fromAirport} - ${f.toAirport}`
            : f.route || "N/A",
        ticketStatus: f.ticketStatus,
        amount: f.totalAmount ?? null,
        totalAmount: f.totalAmount ?? null,
        bookingDate: f.createdAt,
      })),
    ];

    return res.status(200).json({
      success: true,
      count: allBookings.length,
      bookings: allBookings,
    });
  } catch (error) {
    console.error("Error fetching confirmed bookings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getConfirmedBookingById = async (req, res) => {
  try {
    const { type, bookingId } = req.params;

    let bookingModel;
    if (type === "bus") bookingModel = BookingBus;
    else if (type === "rail") bookingModel = BookingRail;
    else if (type === "flight") bookingModel = BookingFlight;
    else return res.status(400).json({ message: "Invalid booking type" });

    const booking = await bookingModel.findOne({
      where: {
        id: bookingId,
        ticketStatus: { [Op.eq]: "Confirmed" || "Waiting" },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["id", "name", "email", "phone"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Confirmed booking not found" });
    }

    let route = "N/A";
    if (type === "bus")
      route =
        booking.fromStop && booking.toStop
          ? `${booking.fromStop} - ${booking.toStop}`
          : booking.route;
    if (type === "rail")
      route =
        booking.fromStation && booking.toStation
          ? `${booking.fromStation} - ${booking.toStation}`
          : booking.route;
    if (type === "flight")
      route =
        booking.fromAirport && booking.toAirport
          ? `${booking.fromAirport} - ${booking.toAirport}`
          : booking.route;

    const response = {
      bookingId: booking.id,
      type: type.charAt(0).toUpperCase() + type.slice(1),
      ticketStatus: booking.ticketStatus,
      amount: booking.totalAmount ?? null,
      totalAmount: booking.totalAmount ?? null,
      bookingDate: booking.createdAt,
      route,
      client: booking.client,
      passengers: booking.passengerDetails ?? null,
      companyId: booking.companyId ?? null,
    };

    return res.status(200).json({ success: true, booking: response });
  } catch (err) {
    console.error("Error fetching confirmed booking by ID:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
