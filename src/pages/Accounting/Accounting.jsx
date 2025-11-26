// src/pages/Accounting/Accounting.jsx
import { useEffect, useMemo, useState } from "react";
import { Plus, FileText, Database, BookOpen } from "lucide-react";
import LedgerForm from "./LedgerForm";
import LedgerList from "./LedgerList";
import TransactionForm from "./TransactionForm";
import Cashbook from "./Cashbook";

const sampleLedgers = [
  { id: "L1", name: "Cash in Hand", type: "asset", opening: 50000, createdAt: "2024-01-01", description: "" },
  { id: "L2", name: "Bank Account - HDFC", type: "asset", opening: 100000, createdAt: "2024-01-01", description: "" },
  { id: "L3", name: "Office Expenses", type: "expense", opening: 0, createdAt: "2024-01-01", description: "" },
];

export default function Accounting() {
  const [tab, setTab] = useState("create"); 
  const [ledgers, setLedgers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ledgers")) || sampleLedgers; } catch { return sampleLedgers; }
  });
  const [transactions, setTransactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("transactions")) || []; } catch { return []; }
  });

 
  useEffect(() => localStorage.setItem("ledgers", JSON.stringify(ledgers)), [ledgers]);
  useEffect(() => localStorage.setItem("transactions", JSON.stringify(transactions)), [transactions]);


  const addLedger = (ledger) => {
    setLedgers(prev => [...prev, { ...ledger, id: `L${Date.now()}`, createdAt: new Date().toISOString().slice(0,10) }]);
  };
  const updateLedger = (updated) => {
    setLedgers(prev => prev.map(l => l.id === updated.id ? updated : l));
  };
  const deleteLedger = (id) => {
    if (!confirm("Delete ledger?")) return;
    setLedgers(prev => prev.filter(l => l.id !== id));
    setTransactions(prev => prev.filter(t => t.ledgerId !== id));
  };

  const addTransaction = (tx) => {
    const txWithId = { ...tx, id: `T${Date.now()}`, date: tx.date || new Date().toISOString().slice(0,10) };
    setTransactions(prev => [txWithId, ...prev]);
  };

  
  const balances = useMemo(() => {
    const map = {};
    for (const l of ledgers) map[l.id] = Number(l.opening || 0);
    for (const t of transactions) {
      if (!map[t.ledgerId]) continue;
      
      map[t.ledgerId] = t.type === "cr" ? map[t.ledgerId] + Number(t.amount) : map[t.ledgerId] - Number(t.amount);
    }
    return map;
  }, [ledgers, transactions]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Accounting</h1>
        <p className="text-gray-600">Manage ledgers, transactions, and cashbook</p>
      </div>

    
      <div className="bg-white border rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <Tab label="Create Ledger" active={tab==="create"} onClick={() => setTab("create")} icon={<Plus className="h-4 w-4" />} />
          <Tab label="Show Ledger" active={tab==="show"} onClick={() => setTab("show")} icon={<FileText className="h-4 w-4" />} />
          <Tab label="Dr-Cr" active={tab==="drcr"} onClick={() => setTab("drcr")} icon={<Database className="h-4 w-4" />} />
          <Tab label="Cashbook" active={tab==="cashbook"} onClick={() => setTab("cashbook")} icon={<BookOpen className="h-4 w-4" />} />
        </div>

        <div className="mt-6">
          {tab === "create" && (
            <LedgerForm onSave={addLedger} onReset={() => {}} />
          )}
          {tab === "show" && (
            <LedgerList ledgers={ledgers} balances={balances} onEdit={updateLedger} onDelete={deleteLedger} />
          )}
          {tab === "drcr" && (
            <TransactionForm ledgers={ledgers} onRecord={addTransaction} />
          )}
          {tab === "cashbook" && (
            <Cashbook ledgers={ledgers} transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium ${active ? "bg-gray-100 shadow" : "text-gray-600"}`}
    >
      <div className="flex items-center gap-2">{icon}<span>{label}</span></div>
    </button>
  );
}

