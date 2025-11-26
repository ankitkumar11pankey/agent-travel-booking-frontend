const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getAgentEnquiries,
  assignEnquiryToAgent,
  getAllAgents,
  updateEnquiryStatus,
} = require("../controllers/enquiryController");
const {
  authorizeRoles,
  authenticate,
} = require("../middleware/authMiddleware");

router.post("/create/enquiry", authenticate, createEnquiry);

router.get("/getAllEnquiries", getAllEnquiries);

router.get("/agent/enquiries/:id", getAgentEnquiries);

router.put(
  "/assign-enquiry",
  authenticate,
  authorizeRoles("admin"),
  assignEnquiryToAgent
);

router.get(
  "/get-all-agents",
  authenticate,
  authorizeRoles("admin"),
  getAllAgents
);

router.put("/update-enquiry-status/:id", authenticate, updateEnquiryStatus);

module.exports = router;
