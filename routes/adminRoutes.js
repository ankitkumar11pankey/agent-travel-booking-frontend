
const express = require("express");
const router = express.Router();
const { createAgent, getAllAgents ,  updateAgentStatus,  deleteAgent,} = require("../controllers/adminController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

// Only admin can create agents
router.post("/create-agent", authenticate, authorizeRoles("admin"), createAgent);

router.get("/getAllAgents", getAllAgents);

router.put("/update-agent-status/:id", updateAgentStatus);

router.delete("/delete-agent/:id", deleteAgent);

module.exports = router;
