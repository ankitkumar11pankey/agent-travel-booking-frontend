const Ledger = require("../models/ledgerModel");
const Client = require("../models/clientModel");
const User = require("../models/userModel");


exports.createLedgerEntry = async (req, res) => {
  try {
    const {
      clientId,
      agentId,
      bookingId,
      bookingType,
      entryType,
      description,
      amount,
      paymentMode,
      createdBy,
    } = req.body;

    if (!clientId || !entryType || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "clientId, entryType, and amount are required" });
    }


    const lastEntry = await Ledger.findOne({
      where: { clientId },
      order: [["transactionDate", "DESC"]],
    });

    let newBalance = 0;
    if (lastEntry) {
      newBalance = parseFloat(lastEntry.balanceAfter);
    }

    if (entryType === "credit") newBalance += parseFloat(amount);
    else if (entryType === "debit") newBalance -= parseFloat(amount);

    const ledgerEntry = await Ledger.create({
      clientId,
      agentId,
      bookingId,
      bookingType,
      entryType,
      description,
      amount,
      balanceAfter: newBalance,
      paymentMode,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Ledger entry created successfully",
      data: ledgerEntry,
    });
  } catch (error) {
    console.error("Ledger Creation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


exports.getLedgerByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const entries = await Ledger.findAll({
      where: { clientId },
      order: [["transactionDate", "ASC"]],
      include: [
        { model: Client, as: "client", attributes: ["name", "email", "phone"] },
        { model: User, as: "createdByUser", attributes: ["name", "role"] },
      ],
    });

    if (!entries.length) {
      return res.status(404).json({
        success: false,
        message: "No ledger entries found for this client",
      });
    }

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error("Get Ledger Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



