import { useState, useEffect, FormEvent } from 'react';
import { INITIAL_EXPENSES } from '../data';
import { Expense } from '../types';
import { DollarSign, Plus, Trash2, TrendingUp, Users, Calculator, RefreshCw, AlertCircle } from 'lucide-react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('Parents (Mom & Dad)');
  const [splitMode, setSplitMode] = useState<'equal' | 'parents' | 'grandparents'>('equal');
  const [category, setCategory] = useState<'Transport' | 'Food' | 'Hotel' | 'Activities' | 'Other'>('Activities');

  // Load from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem('family_eastcoast_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      setExpenses(INITIAL_EXPENSES);
    }
  }, []);

  const saveToStorage = (updatedList: Expense[]) => {
    setExpenses(updatedList);
    localStorage.setItem('family_eastcoast_expenses', JSON.stringify(updatedList));
  };

  const handleAddExpense = (e: FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) return;

    let splitBetween: string[] = [];
    if (splitMode === 'equal') {
      splitBetween = ['Grandpa & Grandma', 'Parents (Mom & Dad)'];
    } else if (splitMode === 'parents') {
      splitBetween = ['Parents (Mom & Dad)'];
    } else {
      splitBetween = ['Grandpa & Grandma'];
    }

    const newExp: Expense = {
      id: `expense-${Date.now()}`,
      title,
      amount: parsedAmount,
      paidBy,
      splitBetween,
      category,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [...expenses, newExp];
    saveToStorage(updated);

    // Reset inputs
    setTitle('');
    setAmount('');
    setSplitMode('equal');
  };

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter(exp => exp.id !== id);
    saveToStorage(updated);
  };

  const resetExpenses = () => {
    if (window.confirm('Are you sure you want to reset expenses to the initial list?')) {
      saveToStorage(INITIAL_EXPENSES);
    }
  };

  // Calculations
  const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  // Who spent what
  const parentsPaid = expenses
    .filter(exp => exp.paidBy === 'Parents (Mom & Dad)')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const grandparentsPaid = expenses
    .filter(exp => exp.paidBy === 'Grandpa & Grandma')
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Debts calculation
  // Let's determine how much Parents should have paid, and Grandparents should have paid
  let parentsTarget = 0;
  let grandparentsTarget = 0;

  expenses.forEach(exp => {
    const splitCount = exp.splitBetween.length;
    const portion = exp.amount / splitCount;

    if (exp.splitBetween.includes('Parents (Mom & Dad)')) {
      parentsTarget += portion;
    }
    if (exp.splitBetween.includes('Grandpa & Grandma')) {
      grandparentsTarget += portion;
    }
  });

  // Settlements: positive means Parents paid more than their target, so Grandparents owe them
  // negative means Grandparents paid more, so Parents owe them
  const parentsBalance = parentsPaid - parentsTarget;
  const settlementText = parentsBalance > 0
    ? `Grandparents owe Parents $${parentsBalance.toFixed(2)}`
    : parentsBalance < 0
      ? `Parents owe Grandparents $${Math.abs(parentsBalance).toFixed(2)}`
      : 'All balances are perfectly settled!';

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm" id="expense-tracker">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sky-500" />
            Trip Budget & Expense Splitter
          </h3>
          <p className="text-slate-500 text-sm mt-0.5">
            Log hotel, minivan, and attraction bills. Automatically calculate shares between households.
          </p>
        </div>

        <button
          id="btn-reset-expenses"
          onClick={resetExpenses}
          className="text-xs font-semibold text-slate-500 hover:text-red-500 bg-slate-50 hover:bg-red-50 px-3.5 py-1.5 rounded-lg border border-slate-100 hover:border-red-100 transition-colors self-start md:self-auto cursor-pointer"
        >
          Reset List
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
          <span className="block text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">Total Trip Outlay</span>
          <span className="block text-3xl font-bold font-mono text-sky-400 mt-1">${totalSpend.toFixed(2)}</span>
          <span className="block text-xs text-slate-400 mt-1.5">Shared across 6 days of travel</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
          <span className="block text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">Paid Breakdown</span>
          <div className="space-y-1.5 mt-2 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>👨 Parents:</span>
              <span className="font-mono">${parentsPaid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-700">
              <span>👵 Grandparents:</span>
              <span className="font-mono">${grandparentsPaid.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-100 text-sky-950 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="block text-[10px] font-mono tracking-widest uppercase text-sky-700 font-bold flex items-center gap-1">
              <Users className="w-3 h-3" /> Settlement Balance
            </span>
            <p className="text-sm font-display font-semibold mt-2 text-slate-900 leading-snug">
              {settlementText}
            </p>
          </div>
          <p className="text-[10px] text-sky-600/80 font-medium mt-1.5">
            Calculation accounts for selected split structures.
          </p>
        </div>
      </div>

      {/* Form & List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form left */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 h-fit">
          <h4 className="font-display font-semibold text-slate-900 text-sm mb-3.5">Log Trip Bill / Ticket</h4>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Bill Name / Ticket Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Jane's Carousel entry"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs border border-slate-200 bg-white rounded-lg px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Cost ($ USD)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="25.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-xs border border-slate-200 bg-white rounded-lg pl-6 pr-3 py-2.5 outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs border border-slate-200 bg-white rounded-lg px-2 py-2.5 outline-none focus:border-sky-500"
                >
                  <option value="Activities">Activities</option>
                  <option value="Transport">Transport</option>
                  <option value="Food">Food</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Who Paid?</label>
              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full text-xs border border-slate-200 bg-white rounded-lg px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option value="Parents (Mom & Dad)">Parents (Mom & Dad)</option>
                <option value="Grandpa & Grandma">Grandpa & Grandma</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Split Method</label>
              <select
                value={splitMode}
                onChange={(e) => setSplitMode(e.target.value as any)}
                className="w-full text-xs border border-slate-200 bg-white rounded-lg px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option value="equal">Split 50/50 between households</option>
                <option value="parents">Paid 100% by Parents</option>
                <option value="grandparents">Paid 100% by Grandparents</option>
              </select>
            </div>

            <button
              type="submit"
              id="btn-add-expense-item"
              className="w-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 py-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Log Expense
            </button>
          </form>
        </div>

        {/* List right */}
        <div className="lg:col-span-2 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {expenses.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
              <DollarSign className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-950">No expenses logged yet</p>
              <p className="text-xs text-slate-500 mt-1">Add items like restaurant bills, Lyft fares, and snack runs.</p>
            </div>
          ) : (
            expenses.map((exp) => (
              <div 
                id={`expense-item-${exp.id}`}
                key={exp.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-2xs transition-all duration-150 animate-fade-in"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 leading-snug">{exp.title}</h5>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 font-mono">
                      Paid by: <span className="text-slate-600 font-semibold">{exp.paidBy.split(' ')[0]}</span>
                      <span className="mx-1">•</span> 
                      Split: <span className="text-slate-600 font-semibold">{exp.splitBetween.length === 1 ? 'Individual' : '50/50 Share'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-sm font-bold font-mono text-slate-950">${exp.amount.toFixed(2)}</span>
                    <span className="block text-[9px] text-slate-400 font-mono">{exp.date}</span>
                  </div>
                  
                  <button
                    id={`expense-btn-delete-${exp.id}`}
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
