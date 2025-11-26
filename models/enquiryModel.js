const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 

const Enquiry = sequelize.define("Enquiry", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mode: {
    type: DataTypes.ENUM("Bus", "Train", "Flight"),
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("admin", "agent"),
    allowNull: false,
  },


  enquirystatus: {
    type: DataTypes.ENUM("new","assigned", "in_progress", "completed", "closed"),
    defaultValue: "new",
  },

   creatorName: { type: DataTypes.STRING, allowNull: true },

  assignEnquiry: {
    type: DataTypes.INTEGER, 
    allowNull: true,
  },

  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});



// Optional 
// User.hasMany(Enquiry, { foreignKey: "assignedTo", as: "AssignedEnquiries" });
// User.hasMany(Enquiry, { foreignKey: "createdBy", as: "CreatedEnquiries" });
// Enquiry.belongsTo(User, { foreignKey: "assignedTo", as: "AssignedAgent" });
// Enquiry.belongsTo(User, { foreignKey: "createdBy", as: "Creator" });


module.exports = Enquiry;
