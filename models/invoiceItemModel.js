const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Invoice = require("./invoiceModel");

const InvoiceItem = sequelize.define("InvoiceItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  invoiceId: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING(512) },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  unitPrice: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 },
  taxPercent: { type: DataTypes.DECIMAL(5,2), defaultValue: 0.0 },
  taxAmount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 },
  lineTotal: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 }
}, {
  tableName: "invoice_items",
  timestamps: true,
});

InvoiceItem.belongsTo(Invoice, { foreignKey: "invoiceId", as: "invoice" });
Invoice.hasMany(InvoiceItem, { foreignKey: "invoiceId", as: "items" });

module.exports = InvoiceItem;
