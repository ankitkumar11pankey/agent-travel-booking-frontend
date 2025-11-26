
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();


const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      req.userRole = decoded.role || user.role; 
      next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};


const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.userRole || (req.user && req.user.role);
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };
