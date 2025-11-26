const Ledger = require("../models/ledgerModel"); // your ledger model
const sequelize = require("../config/db");

async function getLastBalance({ agentId, clientId }, t = null) {
  const where = {};
  if (agentId) where.agentId = agentId;
  else if (clientId) where.clientId = clientId;
  else return 0;

  const last = await Ledger.findOne({
    where,
    order: [["createdAt", "DESC"]],
    transaction: t,
  });
  return last ? Number(last.balanceAfter) : 0;
}

async function createEntry(payload, t = null) {
  const transactionOptions = t ? { transaction: t } : {};
  const { clientId, agentId, entryType, amount } = payload;
  const owner = { agentId: agentId || null, clientId: clientId || null };
  const prevBalance = await getLastBalance(owner, t);
  const numericAmount = Number(amount);
  const newBalance = (entryType === "credit") ? prevBalance + numericAmount : prevBalance - numericAmount;

  const entry = await Ledger.create({
    ...payload,
    amount: numericAmount,
    balanceAfter: newBalance,
    transactionDate: payload.transactionDate || new Date(),
  }, transactionOptions);

  return entry;
}

module.exports = { createEntry, getLastBalance };
