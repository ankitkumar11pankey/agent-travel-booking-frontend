// src/pages/Accounting/Cashbook.jsx
import { useMemo, useState } from "react";

export default function Cashbook({ ledgers = [], transactions = [] }) {
  const [filterLedger, setFilterLedger] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (filterLedger && t.ledgerId !== filterLedger) return false;
      if (fromDate && t.date < fromDate) return false;
      if (toDate && t.date > toDate) return false;
      return true;
    });
  }, [transactions, filterLedger, fromDate, toDate]);

  const ledgerName = (id) => ledgers.find(l => l.id === id)?.name || "";

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Cashbook</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select className="border rounded-md px-3 py-2 bg-gray-50" value={filterLedger} onChange={e => setFilterLedger(e.target.value)}>
          <option value="">All Ledgers</option>
          {ledgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} className="border rounded-md px-3 py-2 bg-white" />
        <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} className="border rounded-md px-3 py-2 bg-white" />
        <div className="flex gap-2">
          <button className="px-3 py-2 border rounded-md">Export PDF</button>
          <button className="px-3 py-2 border rounded-md">Excel</button>
          <button className="px-3 py-2 border rounded-md">Print</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="py-2">Date</th>
              <th>Description</th>
              <th>Debit (₹)</th>
              <th>Credit (₹)</th>
              <th>Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {renderCashbookRows(filtered, ledgerName)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderCashbookRows(txList, ledgerName) {

  let running = 0;
  return txList.map(t => {
    const debit = t.type === "dr" ? Number(t.amount) : "-";
    const credit = t.type === "cr" ? Number(t.amount) : "-";
    running = t.type === "cr" ? running + Number(t.amount) : running - Number(t.amount);
    return (
      <tr key={t.id} className="border-t">
        <td className="py-3">{t.date}</td>
        <td>
          <div className="font-medium">{ledgerName(t.ledgerId)}</div>
          <div className="text-sm text-gray-500">{t.remarks}</div>
        </td>
        <td className="text-red-600">{debit === "-" ? "-" : numberWithCommas(debit)}</td>
        <td className="text-green-600">{credit === "-" ? "-" : numberWithCommas(credit)}</td>
        <td className="text-green-600">₹{numberWithCommas(running)}</td>
      </tr>
    );
  });
}

function numberWithCommas(x){ return (x || 0).toLocaleString(); }
