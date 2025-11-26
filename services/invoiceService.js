const sequelize = require("../config/db");
const Invoice = require("../models/invoiceModel");
const InvoiceItem = require("../models/invoiceItemModel");
const { generateInvoiceNumber } = require("../utils/invoiceNumber");
const { renderInvoicePdf } = require("../utils/pdfGenerator");
const ledgerService = require("./ledgerService");
const Company = require("../models/companyModel"); // optional seller

async function createInvoiceForBooking({ bookingId, bookingType, items = [], invoiceDate, dueDate, createdBy, includeCompanyId, clientId, agentId, invoiceMeta = {} }) {
  const t = await sequelize.transaction();
  try {
    let subTotal = 0, taxTotal = 0;
    const preparedItems = items.map(it => {
      const qty = Number(it.quantity || 1);
      const up = Number(it.unitPrice || 0);
      const taxPct = Number(it.taxPercent || 0);
      const lineSub = +(qty * up).toFixed(2);
      const taxAmt = +((lineSub * taxPct) / 100).toFixed(2);
      const lineTotal = +(lineSub + taxAmt).toFixed(2);
      subTotal = +(subTotal + lineSub).toFixed(2);
      taxTotal = +(taxTotal + taxAmt).toFixed(2);
      return { ...it, quantity: qty, unitPrice: up, taxPercent: taxPct, taxAmount: taxAmt, lineTotal };
    });
    const totalAmount = +(subTotal + taxTotal).toFixed(2);

    const invoiceNumber = await generateInvoiceNumber({ transaction: t });


    const invoice = await Invoice.create({
      invoiceNumber,
      bookingId,
      bookingType,
      clientId,
      agentId,
      invoiceDate,
      dueDate,
      currency: "INR",
      subTotal,
      taxTotal,
      totalAmount,
      status: "issued",
      invoiceMeta,
      createdBy
    }, { transaction: t });


    for (const it of preparedItems) {
      await InvoiceItem.create({
        invoiceId: invoice.id,
        description: it.description,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        taxPercent: it.taxPercent,
        taxAmount: it.taxAmount,
        lineTotal: it.lineTotal
      }, { transaction: t });
    }

  
    const company = includeCompanyId ? await Company.findByPk(includeCompanyId) : null;
    const pdfPath = await renderInvoicePdf(invoice, preparedItems, { bookingType, company, clientId, agentId });

    invoice.pdfPath = pdfPath;
    await invoice.save({ transaction: t });

  
    await ledgerService.createEntry({
      clientId,
      agentId,
      bookingId,
      bookingType,
      entryType: "debit",
      description: `Invoice ${invoiceNumber}`,
      amount: totalAmount,
      createdBy
    }, t);

    await t.commit();
    return invoice;
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

module.exports = { createInvoiceForBooking };
