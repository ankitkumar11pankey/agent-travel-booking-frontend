
import { useState } from "react";

const ledgerTypes = [
  { value: "asset", label: "Asset" },
  { value: "liability", label: "Liability" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
  { value: "personal", label: "Personal" },
];

export default function LedgerForm({ onSave, onReset }) {
  const [data, setData] = useState({
    name: "",
    type: "personal",
    opening: 0,
    date: new Date().toISOString().slice(0,10),
    description: "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!data.name.trim()) { alert("Enter ledger name"); return; }
    onSave(data);
    setData({ name: "", type: "personal", opening: 0, date: new Date().toISOString().slice(0,10), description: "" });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <h3 className="text-lg font-medium">Create New Ledger</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">Ledger Name *</label>
          <input value={data.name} onChange={e => setData({...data, name: e.target.value})}
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="Enter ledger name" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Type *</label>
          <select value={data.type} onChange={e => setData({...data, type: e.target.value})}
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50">
            {ledgerTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700">Opening Balance (₹) *</label>
          <input type="number" value={data.opening} onChange={e => setData({...data, opening: Number(e.target.value)})}
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Date *</label>
          <input type="date" value={data.date} onChange={e => setData({...data, date: e.target.value})}
            className="w-full border rounded-md px-3 py-2 text-sm bg-white" />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-700">Description</label>
        <textarea value={data.description} onChange={e => setData({...data, description: e.target.value})}
          className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" rows={3} placeholder="Enter description..." />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-[#0b1220] text-white rounded-md">Save Ledger</button>
        <button type="button" onClick={() => setData({ name: "", type: "personal", opening: 0, date: new Date().toISOString().slice(0,10), description: ""})}
          className="px-4 py-2 border rounded-md">Reset</button>
      </div>
    </form>
  );
}
