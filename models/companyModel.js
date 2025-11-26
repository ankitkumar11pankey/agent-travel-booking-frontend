const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Company = sequelize.define(
  "Company",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    gstNumber: { type: DataTypes.STRING(32) },
    panNumber: { type: DataTypes.STRING(20) },
    contactPerson: { type: DataTypes.STRING(150) },
    phone: { type: DataTypes.STRING(30) },
    email: { type: DataTypes.STRING(150) },
    addressLine1: { type: DataTypes.STRING(255) },
    city: { type: DataTypes.STRING(100) },
    state: { type: DataTypes.STRING(100) },
    postalCode: { type: DataTypes.STRING(20) },
    country: { type: DataTypes.STRING(100), defaultValue: "India" },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    notes: { type: DataTypes.TEXT },
    createdBy: { type: DataTypes.INTEGER },
    updatedBy: { type: DataTypes.INTEGER },
  },
  {
    tableName: "companies",
    timestamps: true,
  }
);
 
module.exports = Company;
