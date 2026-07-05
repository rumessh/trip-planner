import { useState, useEffect, FormEvent } from 'react';
import { INITIAL_PACKING_LIST } from '../data';
import { PackingItem, TravelerType } from '../types';
import { CheckSquare, Square, Plus, Trash2, ShieldCheck, Heart, Sparkles, Footprints, Info } from 'lucide-react';

export default function PackingChecklist() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<TravelerType | 'all' | 'general'>('all');
  
  // Custom packing item inputs
  const [newItemText, setNewItemText] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newAssignee, setNewAssignee] = useState<TravelerType | 'all'>('all');

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('family_eastcoast_packing');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_PACKING_LIST);
    }
  }, []);

  const saveToStorage = (updatedItems: PackingItem[]) => {
    setItems(updatedItems);
    localStorage.setItem('family_eastcoast_packing', JSON.stringify(updatedItems));
  };

  const toggleItem = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    saveToStorage(updated);
  };

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PackingItem = {
      id: `pack-${Date.now()}`,
      category: newCategory,
      item: newItemText.trim(),
      packed: false,
      assignee: newAssignee
    };

    const updated = [...items, newItem];
    saveToStorage(updated);
    setNewItemText('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  const resetList = () => {
    if (window.confirm('Are you sure you want to reset the packing list to the original configuration?')) {
      saveToStorage(INITIAL_PACKING_LIST);
    }
  };

  // Filter items
  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'general') return item.assignee === 'all';
    return item.assignee === activeFilter;
  });

  // Math for stats
  const totalCount = filteredItems.length;
  const packedCount = filteredItems.filter(i => i.packed).length;
  const percentPacked = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const getAssigneeBadge = (assignee: string) => {
    switch (assignee) {
      case 'grandparents':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <Heart className="w-2.5 h-2.5" /> Grp
          </span>
        );
      case 'parents':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <Info className="w-2.5 h-2.5" /> Prt
          </span>
        );
      case 'kid8':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <Sparkles className="w-2.5 h-2.5" /> Leo (8)
          </span>
        );
      case 'toddlers':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <Footprints className="w-2.5 h-2.5" /> Girls
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            All
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm" id="packing-checklist">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Family Luggage Packing Assistant
          </h3>
          <p className="text-slate-500 text-sm mt-0.5">
            Individual checklists for toddler play water clothes, elder comfort items, and ticket passes.
          </p>
        </div>
        
        <button
          id="btn-reset-packing"
          onClick={resetList}
          className="text-xs font-semibold text-slate-500 hover:text-red-500 bg-slate-50 hover:bg-red-50 px-3.5 py-1.5 rounded-lg border border-slate-100 hover:border-red-100 transition-colors self-start md:self-auto cursor-pointer"
        >
          Reset List
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5 uppercase font-mono">
            <span>Overall Luggage Ready</span>
            <span className="text-sky-600">{packedCount} / {totalCount} Items Packed ({percentPacked}%)</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percentPacked}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 pb-2 border-b border-slate-100">
        <button
          id="pack-filter-all"
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
            activeFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          All Items
        </button>
        <button
          id="pack-filter-grandparents"
          onClick={() => setActiveFilter('grandparents')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
            activeFilter === 'grandparents' ? 'bg-rose-50 text-rose-700 border border-rose-100 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-3.5 h-3.5" /> Grandparents
        </button>
        <button
          id="pack-filter-parents"
          onClick={() => setActiveFilter('parents')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
            activeFilter === 'parents' ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Info className="w-3.5 h-3.5" /> Parents
        </button>
        <button
          id="pack-filter-kid8"
          onClick={() => setActiveFilter('kid8')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
            activeFilter === 'kid8' ? 'bg-amber-50 text-amber-700 border border-amber-100 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Leo (8)
        </button>
        <button
          id="pack-filter-toddlers"
          onClick={() => setActiveFilter('toddlers')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
            activeFilter === 'toddlers' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Footprints className="w-3.5 h-3.5" /> Girls (3 & 4)
        </button>
        <button
          id="pack-filter-general"
          onClick={() => setActiveFilter('general')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
            activeFilter === 'general' ? 'bg-slate-300 text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          General Shared
        </button>
      </div>

      {/* Grid: Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form left */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 h-fit">
          <h4 className="font-display font-semibold text-slate-900 text-sm mb-3">Add Custom Luggage Item</h4>
          <form onSubmit={handleAddItem} className="space-y-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Item Description</label>
              <input
                type="text"
                required
                placeholder="e.g., Waterproof sunscreen SPF 50"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="w-full text-xs border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs border border-slate-200 bg-white rounded-lg px-2.5 py-2 outline-none focus:border-sky-500"
                >
                  <option value="Health & Comfort">Health</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Kids Fun">Kids Fun</option>
                  <option value="Toddlers Needs">Toddler Needs</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Assign To</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value as TravelerType | 'all')}
                  className="w-full text-xs border border-slate-200 bg-white rounded-lg px-2.5 py-2 outline-none focus:border-sky-500"
                >
                  <option value="all">Shared (All)</option>
                  <option value="grandparents">Grandparents</option>
                  <option value="parents">Parents</option>
                  <option value="kid8">Leo (8yo)</option>
                  <option value="toddlers">Zoe & Lily</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              id="btn-add-packing-item"
              className="w-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add to List
            </button>
          </form>
        </div>

        {/* List right */}
        <div className="lg:col-span-2 space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
              <CheckSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-950">No packing items matching filter</p>
              <p className="text-xs text-slate-500 mt-1">Select a different tab or add some custom items to get started!</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                id={`packing-item-${item.id}`}
                key={item.id}
                className={`flex items-center justify-between gap-4 p-3 rounded-xl border transition-all duration-150 ${
                  item.packed 
                    ? 'bg-emerald-50/10 border-emerald-100/50 text-slate-400' 
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-2xs'
                }`}
              >
                <button
                  id={`packing-btn-toggle-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                >
                  {item.packed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 hover:text-slate-400 shrink-0" />
                  )}
                  <div>
                    <span className={`text-sm font-medium ${item.packed ? 'line-through' : 'text-slate-800'}`}>
                      {item.item}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono tracking-tight">
                      {item.category}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  {getAssigneeBadge(item.assignee)}
                  <button
                    id={`packing-btn-delete-${item.id}`}
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
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
