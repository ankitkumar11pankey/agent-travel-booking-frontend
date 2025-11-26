const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware"); 
const invoiceController = require("../controllers/invoiceController");

router.post("/create", authenticate, invoiceController.createInvoice);
router.get("/", authenticate, invoiceController.listInvoices);
router.get("/:id/pdf", authenticate, invoiceController.downloadPdf);
router.post("/:id/mark-paid", authenticate, invoiceController.markPaid);

module.exports = router;
