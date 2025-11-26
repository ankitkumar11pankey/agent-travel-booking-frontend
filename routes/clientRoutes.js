
const router = require("express").Router();
const { createClient,getClients,searchClients} = require("../controllers/clientController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/create", authenticate, createClient);
router.get("/list", authenticate, getClients); 

router.get("/search", searchClients);

module.exports = router;
