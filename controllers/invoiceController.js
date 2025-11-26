const Invoice = require("../models/invoiceModel");
const InvoiceItem = require("../models/invoiceItemModel");
const { createInvoiceForBooking } = require("../services/invoiceService");
const ledgerService = require("../services/ledgerService");
const path = require("path");
const fs = require("fs");

exports.createInvoice = async (req, res) => {
  try {
    const { bookingId, bookingType, items, invoiceDate, dueDate, clientId, agentId, invoiceMeta, companyId } = req.body;
    const createdBy = req.user?.id || null;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Provide items array" });
    }
    const invoice = await createInvoiceForBooking({
      bookingId, bookingType, items, invoiceDate: invoiceDate || new Date(), dueDate, createdBy,
      includeCompanyId: companyId, clientId, agentId, invoiceMeta
    });
    res.status(201).json({ success: true, invoice });
  } catch (err) {
    console.error("Invoice create error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// exports.downloadPdf = async (req, res) => {
//   try {
//     const invoice = await Invoice.findByPk(req.params.id);
//     if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
//     if (!invoice.pdfPath) return res.status(400).json({ success: false, message: "PDF not generated" });

//     const absolutePath = path.join(__dirname, "..", invoice.pdfPath);

//     if (!fs.existsSync(absolutePath)) {
//       return res.status(404).json({ success: false, message: "PDF file missing on server" });
//     }

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `inline; filename=${path.basename(absolutePath)}`);

//     const fileStream = fs.createReadStream(absolutePath);
//     fileStream.pipe(res);

//   } catch (err) {
//     console.error("PDF Download Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

exports.downloadPdf = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    if (!invoice.pdfPath) return res.status(400).json({ success: false, message: "PDF not generated yet" });


    const absolutePath = path.resolve(process.cwd(), invoice.pdfPath);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ success: false, message: "PDF file missing on server" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${path.basename(absolutePath)}`);

    const stream = fs.createReadStream(absolutePath);
    stream.pipe(res);

  } catch (err) {
    console.error("PDF Download Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ order: [["createdAt","DESC"]] });
    res.json({ success: true, count: invoices.length, invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.markPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentAmount, paymentMode, paymentRef } = req.body;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });


    await ledgerService.createEntry({
      clientId: invoice.clientId,
      agentId: invoice.agentId,
      bookingId: invoice.bookingId,
      bookingType: invoice.bookingType,
      entryType: "credit",
      description: `Payment for ${invoice.invoiceNumber} - ${paymentRef || ''}`,
      amount: paymentAmount,
      createdBy: req.user?.id || null
    });

  
    if (+paymentAmount >= +invoice.totalAmount) invoice.status = "paid";
    await invoice.save();

    res.json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
