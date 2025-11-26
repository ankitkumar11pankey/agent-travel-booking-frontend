const express = require("express");
const router = express.Router();
const { createLedgerEntry, getLedgerByClient } = require("../controllers/ledgerController");


router.post("/create", createLedgerEntry);


router.get("/:clientId", getLedgerByClient);


module.exports = router;