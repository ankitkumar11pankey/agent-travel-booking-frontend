const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Invoice = sequelize.define("Invoice", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  invoiceNumber: { type: DataTypes.STRING(64), unique: true, allowNull: false },
  bookingId: { type: DataTypes.INTEGER },
  bookingType: { type: DataTypes.ENUM("flight","bus","rail") },
  clientId: { type: DataTypes.INTEGER },
  agentId: { type: DataTypes.INTEGER },
  invoiceDate: { type: DataTypes.DATEONLY, allowNull: false },
  dueDate: { type: DataTypes.DATEONLY },
  currency: { type: DataTypes.STRING(10), defaultValue: "INR" },
  subTotal: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 },
  taxTotal: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 },
  totalAmount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 },
  status: { type: DataTypes.ENUM("draft","issued","paid","cancelled"), defaultValue: "draft" },
  pdfPath: { type: DataTypes.STRING(255) },
  invoiceMeta: { type: DataTypes.JSON },
  createdBy: { type: DataTypes.INTEGER },
  updatedBy: { type: DataTypes.INTEGER }
}, {
  tableName: "invoices",
  timestamps: true,
});

module.exports = Invoice;
