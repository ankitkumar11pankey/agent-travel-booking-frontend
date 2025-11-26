const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");

async function generateInvoiceNumber({ transaction }) {
  if (!transaction) throw new Error("Transaction required for invoice number generation");
  const now = new Date();
  const period = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`; // YYYYMM

  const rows = await sequelize.query(
    `SELECT id, lastNumber FROM invoice_counters WHERE period = ? FOR UPDATE`,
    { replacements: [period], type: QueryTypes.SELECT, transaction }
  );

  let newNumber;
  if (rows.length > 0) {
    newNumber = rows[0].lastNumber + 1;
    await sequelize.query(
      `UPDATE invoice_counters SET lastNumber = ? WHERE period = ?`,
      { replacements: [newNumber, period], transaction }
    );
  } else {
    newNumber = 1;
    await sequelize.query(
      `INSERT INTO invoice_counters (period, lastNumber) VALUES (?, ?)`,
      { replacements: [period, newNumber], transaction }
    );
  }

  const padded = String(newNumber).padStart(5, "0");
  return `INV-${period}-${padded}`;
}

module.exports = { generateInvoiceNumber };
