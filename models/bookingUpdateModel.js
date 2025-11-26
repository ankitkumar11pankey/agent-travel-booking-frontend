const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");
const Client = require("./clientModel");
const CancelledBooking = require("./cancelledBookingModel");

const BookingUpdate = sequelize.define(
  "BookingUpdate",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    bookingType: {
      type: DataTypes.ENUM("flight", "bus", "rail"),
      allowNull: false,
    },

    pnrNumber: { type: DataTypes.STRING, allowNull: true },
    ticketNumber: { type: DataTypes.STRING, allowNull: true },
    uploadTicket: { type: DataTypes.STRING, allowNull: true },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    ticketType: { type: DataTypes.STRING, allowNull: true },
    serviceCharge: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    journeyDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    remarks: { type: DataTypes.STRING, allowNull: true },
    ticketStatus: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled", "Waiting"),
      allowNull: false,
      defaultValue: "Pending",
    },
    updatedBy: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "BookingUpdates",
    timestamps: true,
  }
);

BookingUpdate.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

BookingUpdate.hasOne(CancelledBooking, {
  foreignKey: "bookingId",
  as: "cancellationInfo",
});
module.exports = BookingUpdate;
