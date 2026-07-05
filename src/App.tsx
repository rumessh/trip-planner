import { useState, useEffect, FormEvent } from 'react';
import { 
  Calendar, Map, CheckSquare, Calculator, Info, Compass, 
  Heart, Sparkles, BookOpen, Clock, Plus, Trash2, Send, Sun, Moon
} from 'lucide-react';
import CountdownWidget from './components/CountdownWidget';
import TravelerProfiles from './components/TravelerProfiles';
import InteractiveMap from './components/InteractiveMap';
import ItineraryTimeline from './components/ItineraryTimeline';
import PackingChecklist from './components/PackingChecklist';
import ExpenseTracker from './components/ExpenseTracker';
import QuickReference from './components/QuickReference';
import { JournalEntry } from './types';
import { ITINERARY } from './data';

type ActiveTab = 'itinerary' | 'packing' | 'expenses' | 'quick-ref';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedTravelerType, setSelectedTravelerType] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('family_eastcoast_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  // Trip Journal memory logs
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [newJournalText, setNewJournalText] = useState('');
  const [journalAuthor, setJournalAuthor] = useState('Parents');

  useEffect(() => {
    const savedJournal = localStorage.getItem('family_eastcoast_journal');
    if (savedJournal) {
      setJournalEntries(JSON.parse(savedJournal));
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('family_eastcoast_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddJournalEntry = (e: FormEvent) => {
    e.preventDefault();
    if (!newJournalText.trim()) return;

    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      dayNumber: selectedDay,
      author: journalAuthor,
      text: newJournalText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('family_eastcoast_journal', JSON.stringify(updated));
    setNewJournalText('');
  };

  const handleDeleteJournalEntry = (id: string) => {
    const updated = journalEntries.filter(entry => entry.id !== id);
    setJournalEntries(updated);
    localStorage.setItem('family_eastcoast_journal', JSON.stringify(updated));
  };

  // Dynamic Destination Visual lookup for Day Banner
  const currentItineraryDay = ITINERARY.find(d => d.dayNumber === selectedDay);
  const activeDestination = currentItineraryDay?.destination || 'Washington D.C.';
  const activeDayTitle = currentItineraryDay?.title || '';

  const getDestinationInfo = (dest: string) => {
    switch (dest) {
      case 'Washington D.C.':
        return {
          image: 'https://images.unsplash.com/photo-1524222717473-730000096953?auto=format&fit=crop&w=1200&q=80',
          desc: "Explore the historic avenues of our nation's capital. From world-class museum exhibitions to neoclassical monuments, Day " + selectedDay + " features scenic strolls and educational highlights for all ages."
        };
      case 'New Jersey':
        return {
          image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=1200&q=80',
          desc: "Marvel at the majestic Swaminarayan Akshardham temple in Robbinsville, NJ. Hand-carved by master artisans out of pristine white Italian Carrara marble, it offers an atmosphere of tranquility and awe-inspiring architectural wonder."
        };
      case 'New York City':
        return {
          image: 'https://images.unsplash.com/photo-1524008279394-3aed4643b1d5?auto=format&fit=crop&w=1200&q=80',
          desc: "Experience the vibrant energy and iconic landmarks of Manhattan. From the bustling streets of Times Square and beautiful pathways of Central Park to scenic waterfront ferry cruises, discover the best of NYC."
        };
      default:
        return {
          image: 'https://images.unsplash.com/photo-1524222717473-730000096953?auto=format&fit=crop&w=1200&q=80',
          desc: ''
        };
    }
  };

  const { image: destinationImage, desc: destinationDescription } = getDestinationInfo(activeDestination);
  const featuredStops = currentItineraryDay?.activities.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased pb-12 transition-colors duration-300" id="app-container">
      
      {/* Header Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-50 shadow-2xs transition-colors duration-300" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo/Title */}
            <div className="flex items-center gap-2.5">
              <div className="bg-slate-900 dark:bg-slate-800 text-white p-2 rounded-xl">
                <Compass className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight tracking-tight">
                  East Coast Expedition
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-mono font-medium">
                  DC • NJ • NYC FAMILY PLANNER
                </p>
              </div>
            </div>

            {/* Middle Section: Main Tabs Selector */}
            <nav className="flex space-x-1 sm:space-x-2 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <button
                id="tab-itinerary"
                onClick={() => setActiveTab('itinerary')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'itinerary' 
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-850/50'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Itinerary & Map</span>
                <span className="md:hidden">Itinerary</span>
              </button>
              <button
                id="tab-packing"
                onClick={() => setActiveTab('packing')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'packing' 
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-850/50'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Packing</span>
              </button>
              <button
                id="tab-expenses"
                onClick={() => setActiveTab('expenses')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'expenses' 
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-850/50'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Expenses</span>
              </button>
              <button
                id="tab-quick-ref"
                onClick={() => setActiveTab('quick-ref')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'quick-ref' 
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-850/50'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Logistics & Rules</span>
                <span className="md:hidden">Logistics</span>
              </button>
            </nav>

            {/* Right: Theme Toggle */}
            <div className="flex items-center">
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* Row 1: Countdown Widget */}
        <CountdownWidget />

        {/* Row 2: Traveler Profiles (Custom Care Strategies) */}
        <TravelerProfiles 
          onSelectTravelerType={setSelectedTravelerType} 
          selectedTravelerType={selectedTravelerType}
        />

        {/* Tab content 1: Itinerary & Interactive Map */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6" id="itinerary-tab-wrapper">
            
            {/* Scenic Destination Hero Banner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-2xs flex flex-col md:flex-row relative transition-all duration-300" id="destination-hero-banner">
              {/* Left: Beautiful stock photo with dynamic text overlay */}
              <div className="md:w-3/5 h-48 md:h-56 relative overflow-hidden shrink-0">
                <img 
                  src={destinationImage} 
                  alt={activeDestination} 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/45 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white pr-4">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-400 px-2 py-0.5 bg-sky-950/80 border border-sky-800/40 rounded-md">
                    Day {selectedDay} Destination Visual
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1.5 tracking-tight">
                    {activeDestination}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed max-w-md">
                    {destinationDescription}
                  </p>
                </div>
              </div>

              {/* Right: List of main featured stops for this day */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Day {selectedDay} Featured Activities
                  </h4>
                  <div className="mt-2.5 space-y-2">
                    {featuredStops.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No scheduled activities for this day yet.</p>
                    ) : (
                      featuredStops.map((stop, idx) => (
                        <div key={stop.id || idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{stop.title}</span>
                          <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px] shrink-0 ml-auto">{stop.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="font-medium font-mono">Exploring East Coast</span>
                  <span className="font-semibold text-sky-500 dark:text-sky-400 truncate max-w-[180px]">{activeDayTitle}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="itinerary-map-section">
            
            {/* Left: Schedule Timeline */}
            <div className="lg:col-span-7">
              <ItineraryTimeline 
                selectedDay={selectedDay} 
                onSelectDay={setSelectedDay}
                selectedTravelerType={selectedTravelerType}
              />
            </div>

            {/* Right: Interactive SVG Map & Memory Journal */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-22">
              
              <InteractiveMap 
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />

              {/* Trip Diary / Memory Log */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300" id="journal-widget">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-sky-500" />
                  <h4 className="font-display font-semibold text-slate-900 dark:text-white">
                    Live Memory Log & Journal (Day {selectedDay})
                  </h4>
                </div>

                <form onSubmit={handleAddJournalEntry} className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-800/50 rounded-xl">
                  <div className="flex gap-2">
                    <select
                      value={journalAuthor}
                      onChange={(e) => setJournalAuthor(e.target.value)}
                      className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-250 rounded-lg px-2.5 py-1.5 outline-none font-semibold"
                    >
                      <option value="Parents">Parents</option>
                      <option value="Grandparents">Grandparents</option>
                      <option value="Leo (8yo)">Leo (8yo)</option>
                      <option value="Girls (Zoe/Lily)">Zoe/Lily</option>
                    </select>
                    <span className="text-xs text-slate-400 dark:text-slate-500 self-center font-mono font-medium">is logging:</span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Capture a funny quote, snack check-in, or memory..."
                      value={newJournalText}
                      onChange={(e) => setNewJournalText(e.target.value)}
                      className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-lg pl-3 pr-10 py-2.5 outline-none focus:border-sky-500 focus:dark:border-sky-500"
                    />
                    <button
                      type="submit"
                      id="btn-add-journal"
                      className="absolute right-1.5 top-1.5 p-1.5 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 rounded-md hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                {/* Log list */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {journalEntries.filter(entry => entry.dayNumber === selectedDay).length === 0 ? (
                    <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs italic">
                      No memories logged for Day {selectedDay} yet. Click above to add!
                    </div>
                  ) : (
                    journalEntries
                      .filter(entry => entry.dayNumber === selectedDay)
                      .map((entry) => (
                        <div key={entry.id} className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100/60 dark:border-slate-800 rounded-xl flex items-start justify-between gap-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                              "{entry.text}"
                            </p>
                            <span className="block text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium mt-1">
                              By {entry.author} • {entry.timestamp}
                            </span>
                          </div>
                          <button
                            id={`delete-journal-${entry.id}`}
                            onClick={() => handleDeleteJournalEntry(entry.id)}
                            className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

        {/* Tab content 2: Packing Assistant */}
        {activeTab === 'packing' && (
          <PackingChecklist />
        )}

        {/* Tab content 3: Expense Splitter */}
        {activeTab === 'expenses' && (
          <ExpenseTracker />
        )}

        {/* Tab content 4: Logistics & Cheat Sheets */}
        {activeTab === 'quick-ref' && (
          <QuickReference />
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500 font-mono">
        <div>
          © 2026 Multi-Generational Family East Coast Adventure Planner. All Rights Reserved.
        </div>
        <div>
          Designed for Washington D.C., Robbinsville, NJ & Manhattan
        </div>
      </footer>

    </div>
  );
}
