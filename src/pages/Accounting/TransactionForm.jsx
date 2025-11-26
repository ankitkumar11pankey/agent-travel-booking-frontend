
import { useState } from "react";

export default function TransactionForm({ ledgers = [], onRecord }) {
  const [form, setForm] = useState({
    ledgerId: ledgers[0]?.id || "",
    type: "dr", // dr | cr
    amount: 0,
    date: new Date().toISOString().slice(0,10),
    remarks: "",
  });

 

  const submit = (e) => {
    e.preventDefault();
    if (!form.ledgerId || !form.amount) { alert("Select ledger and enter amount"); return; }
    onRecord({...form});
    setForm({...form, amount: 0, remarks: ""});
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Record Transaction</h3>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Select Ledger *</label>
            <select className="w-full border rounded-md px-3 py-2 bg-gray-50"
              value={form.ledgerId} onChange={e => setForm({...form, ledgerId: e.target.value})}>
              <option value="">Choose ledger</option>
              {ledgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Transaction Type *</label>
            <select className="w-full border rounded-md px-3 py-2 bg-gray-50"
              value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="dr">Debit (Dr)</option>
              <option value="cr">Credit (Cr)</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Amount (₹) *</label>
            <input type="number" className="w-full border rounded-md px-3 py-2 bg-gray-50"
              value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Date *</label>
            <input type="date" className="w-full border rounded-md px-3 py-2 bg-white"
              value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-700 block mb-1">Remarks</label>
          <textarea rows="3" className="w-full border rounded-md px-3 py-2 bg-gray-50"
            value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Enter transaction remarks..." />
        </div>

        <div>
          <button type="submit" className="px-4 py-2 bg-[#0b1220] text-white rounded-md">Record Transaction</button>
        </div>
      </form>
    </div>
  );
}

