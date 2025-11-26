const User = require("./userModel");
const FlightBooking = require("./bookingFlightModel");
const BusBooking = require("./bookingBusModel");
const RailwayBooking = require("./bookingRailModel");
const BookingUpdate = require("./bookingUpdateModel");
const CancelledBooking = require("./cancelledBookingModel");
const Client = require("./clientModel");
const Company = require("./companyModel");


User.hasMany(FlightBooking, { foreignKey: "createdBy", as: "flightBookings" });
FlightBooking.belongsTo(User, { foreignKey: "createdBy", as: "createdByUser" });

User.hasMany(BusBooking, { foreignKey: "createdBy", as: "busBookings" });
BusBooking.belongsTo(User, { foreignKey: "createdBy", as: "createdByUser" });

User.hasMany(RailwayBooking, { foreignKey: "createdBy", as: "railwayBookings" });
RailwayBooking.belongsTo(User, { foreignKey: "createdBy", as: "createdByUser" });


BookingUpdate.hasOne(CancelledBooking, {
  foreignKey: "bookingId",
  as: "cancellationInfo",
});
CancelledBooking.belongsTo(BookingUpdate, {
  foreignKey: "bookingId",
  as: "booking",
});

BookingUpdate.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});
Client.hasMany(BookingUpdate, {
  foreignKey: "clientId",
  as: "bookings",
});


module.exports = { User, FlightBooking, BusBooking, RailwayBooking ,BookingUpdate,CancelledBooking,Client,Company};
