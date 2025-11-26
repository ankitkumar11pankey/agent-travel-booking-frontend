
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function LedgerList({ ledgers = [], balances = {}, onEdit, onDelete }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Ledgers</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="py-3">Ledger Name</th>
              <th>Type</th>
              <th>Opening Balance</th>
              <th>Current Balance</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ledgers.map(l => (
              <tr key={l.id} className="border-t">
                <td className="py-4">{l.name}</td>
                <td>
                  <span className={`inline-block px-3 py-1 rounded-md text-xs ${badgeClass(l.type)}`}>
                    {l.type}
                  </span>
                </td>
                <td>₹{numberWithCommas(l.opening || 0)}</td>
                <td className={balances[l.id] >= 0 ? "text-green-600" : "text-red-600"}>
                  ₹{numberWithCommas(balances[l.id] || 0)}
                </td>
                <td>{l.createdAt}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button title="View" className="p-2 rounded-md hover:bg-gray-50"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => onEdit && onEdit(l)} title="Edit" className="p-2 rounded-md hover:bg-gray-50"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => onDelete && onDelete(l.id)} title="Delete" className="p-2 rounded-md hover:bg-gray-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function badgeClass(type) {
  switch(type) {
    case "asset": return "bg-gray-800 text-white";
    case "expense": return "bg-red-100 text-red-700";
    case "income": return "bg-green-100 text-green-700";
    case "liability": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

function numberWithCommas(x){ return (x || 0).toLocaleString(); }

