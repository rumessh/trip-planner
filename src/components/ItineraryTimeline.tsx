import { useState, useEffect, FormEvent } from 'react';
import { ITINERARY } from '../data';
import { DayItinerary, Activity, FocusGroup } from '../types';
import { 
  Calendar, MapPin, Clock, CheckCircle2, Circle, AlertTriangle, 
  Sparkles, Heart, Footprints, ShieldCheck, Plus, Trash2, Edit2, 
  Utensils, Camera, Home, Car, Info, X, FileText
} from 'lucide-react';

interface ItineraryTimelineProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  selectedTravelerType: string | null;
}

export default function ItineraryTimeline({ selectedDay, onSelectDay, selectedTravelerType }: ItineraryTimelineProps) {
  const [activeDay, setActiveDay] = useState<number>(selectedDay);
  const [focusFilter, setFocusFilter] = useState<FocusGroup | 'all'>('all');
  
  // State for persisted user customizations
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  const [activityNotes, setActivityNotes] = useState<Record<string, string>>({});
  const [customActivities, setCustomActivities] = useState<Record<number, Activity[]>>({});
  
  // Add activity form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newFocus, setNewFocus] = useState<FocusGroup>('general');
  const [newFocusText, setNewFocusText] = useState('');

  // Synchronize internal active day with prop
  useEffect(() => {
    setActiveDay(selectedDay);
  }, [selectedDay]);

  // Handle traveler group selection from outer state
  useEffect(() => {
    if (selectedTravelerType) {
      if (selectedTravelerType === 'grandparents') setFocusFilter('elder');
      else if (selectedTravelerType === 'parents') setFocusFilter('general');
      else if (selectedTravelerType === 'kid8') setFocusFilter('kid8');
      else if (selectedTravelerType === 'toddlers') setFocusFilter('toddlers');
    } else {
      setFocusFilter('all');
    }
  }, [selectedTravelerType]);

  // Load from local storage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('family_eastcoast_completed');
    if (savedCompleted) setCompletedActivities(JSON.parse(savedCompleted));

    const savedNotes = localStorage.getItem('family_eastcoast_notes');
    if (savedNotes) setActivityNotes(JSON.parse(savedNotes));

    const savedCustom = localStorage.getItem('family_eastcoast_custom');
    if (savedCustom) setCustomActivities(JSON.parse(savedCustom));
  }, []);

  // Update prop day when active day changes
  const handleDayChange = (dayNum: number) => {
    setActiveDay(dayNum);
    onSelectDay(dayNum);
  };

  const toggleCompleted = (id: string) => {
    const updated = { ...completedActivities, [id]: !completedActivities[id] };
    setCompletedActivities(updated);
    localStorage.setItem('family_eastcoast_completed', JSON.stringify(updated));
  };

  const handleNoteChange = (id: string, text: string) => {
    const updated = { ...activityNotes, [id]: text };
    setActivityNotes(updated);
    localStorage.setItem('family_eastcoast_notes', JSON.stringify(updated));
  };

  const handleAddActivity = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTime) return;

    const newAct: Activity = {
      id: `custom-${activeDay}-${Date.now()}`,
      time: newTime,
      title: newTitle,
      description: newDesc,
      location: newLocation,
      focusType: newFocus,
      focusText: newFocusText || undefined,
      icon: 'Info'
    };

    const currentDayCustoms = customActivities[activeDay] || [];
    const updatedCustoms = {
      ...customActivities,
      [activeDay]: [...currentDayCustoms, newAct]
    };

    setCustomActivities(updatedCustoms);
    localStorage.setItem('family_eastcoast_custom', JSON.stringify(updatedCustoms));

    // Reset Form
    setNewTime('');
    setNewTitle('');
    setNewDesc('');
    setNewLocation('');
    setNewFocus('general');
    setNewFocusText('');
    setShowAddForm(false);
  };

  const handleDeleteCustomActivity = (id: string) => {
    const currentDayCustoms = customActivities[activeDay] || [];
    const filtered = currentDayCustoms.filter(act => act.id !== id);
    const updatedCustoms = {
      ...customActivities,
      [activeDay]: filtered
    };

    setCustomActivities(updatedCustoms);
    localStorage.setItem('family_eastcoast_custom', JSON.stringify(updatedCustoms));

    // Also remove completed or notes if any
    const updatedCompleted = { ...completedActivities };
    delete updatedCompleted[id];
    setCompletedActivities(updatedCompleted);
    localStorage.setItem('family_eastcoast_completed', JSON.stringify(updatedCompleted));

    const updatedNotes = { ...activityNotes };
    delete updatedNotes[id];
    setActivityNotes(updatedNotes);
    localStorage.setItem('family_eastcoast_notes', JSON.stringify(updatedNotes));
  };

  const currentDayData = ITINERARY.find(d => d.dayNumber === activeDay);
  if (!currentDayData) return null;

  // Combine static and custom activities
  const allDayActivities = [
    ...currentDayData.activities,
    ...(customActivities[activeDay] || [])
  ];

  // Helper to sort activities by simple AM/PM parsing if needed (we'll keep order as inputted/defined)
  const filteredActivities = focusFilter === 'all' 
    ? allDayActivities
    : allDayActivities.filter(act => act.focusType === focusFilter);

  const getFocusBadge = (type: FocusGroup, text?: string) => {
    switch (type) {
      case 'elder':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Heart className="w-3 h-3" />
            Elder Strategy
          </span>
        );
      case 'toddlers':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Footprints className="w-3 h-3" />
            Toddler Focus
          </span>
        );
      case 'kid8':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            8-Yo Focus
          </span>
        );
      case 'security':
        return (
          <span className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <AlertTriangle className="w-3 h-3" />
            Security Alert
          </span>
        );
      case 'dress-code':
        return (
          <span className="inline-flex items-center gap-1 bg-violet-50 border border-violet-100 text-violet-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3 h-3" />
            Dress Code
          </span>
        );
      default:
        return null;
    }
  };

  const getActivityIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Plane': return <Clock className="w-5 h-5 text-indigo-500" />;
      case 'Car': return <Car className="w-5 h-5 text-sky-500" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-500" />;
      case 'Camera': return <Camera className="w-5 h-5 text-purple-500" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-500" />;
      case 'Play': return <Footprints className="w-5 h-5 text-emerald-500" />;
      case 'CheckSquare': return <ShieldCheck className="w-5 h-5 text-blue-500" />;
      default: return <MapPin className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm" id="itinerary-timeline">
      
      {/* Day Selector Tabs */}
      <div className="flex overflow-x-auto pb-3 gap-2 scrollbar-none border-b border-slate-100 mb-6">
        {ITINERARY.map((day) => {
          const isActive = day.dayNumber === activeDay;
          return (
            <button
              id={`day-tab-${day.dayNumber}`}
              key={day.dayNumber}
              onClick={() => handleDayChange(day.dayNumber)}
              className={`px-4 py-2.5 rounded-xl text-left border shrink-0 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold' 
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">Day {day.dayNumber}</div>
              <div className="text-xs font-bold font-display">{day.dateStr.split(',')[1] || day.dateStr}</div>
            </button>
          );
        })}
      </div>

      {/* Day Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono">
              {currentDayData.destination}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-slate-500 font-medium">{currentDayData.dateStr}</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
            {currentDayData.title}
          </h3>
        </div>

        {/* Focus Filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
          <button
            id="filter-all"
            onClick={() => setFocusFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              focusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All
          </button>
          <button
            id="filter-elder"
            onClick={() => setFocusFilter('elder')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
              focusFilter === 'elder' ? 'bg-rose-50 text-rose-700 border border-rose-100/50 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className="w-3 h-3" />
            Elderly
          </button>
          <button
            id="filter-toddlers"
            onClick={() => setFocusFilter('toddlers')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
              focusFilter === 'toddlers' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Footprints className="w-3 h-3" />
            Toddlers
          </button>
          <button
            id="filter-kid8"
            onClick={() => setFocusFilter('kid8')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
              focusFilter === 'kid8' ? 'bg-amber-50 text-amber-700 border border-amber-100/50 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            8yo Focus
          </button>
          <button
            id="filter-security"
            onClick={() => setFocusFilter('security')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
              focusFilter === 'security' ? 'bg-red-50 text-red-700 border border-red-100/50 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            Security
          </button>
        </div>
      </div>

      {/* Add Custom Activity Button */}
      <div className="mb-6 flex justify-end">
        {!showAddForm ? (
          <button
            id="btn-show-add-activity"
            onClick={() => setShowAddForm(true)}
            className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Custom Activity
          </button>
        ) : (
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 w-full animate-fade-in relative">
            <button
              id="btn-close-add-activity"
              onClick={() => setShowAddForm(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-display font-semibold text-slate-900 text-sm mb-3">Add Custom Activity for Day {activeDay}</h4>
            <form onSubmit={handleAddActivity} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Time (e.g., 10:00 AM)</label>
                <input
                  type="text"
                  required
                  placeholder="09:00 AM"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full text-sm border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="Visit some local spots"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-sm border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Description</label>
                <textarea
                  placeholder="Details about what we are doing..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full text-sm border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Central Park"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-sm border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Focus Group Filter Category</label>
                <select
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value as FocusGroup)}
                  className="w-full text-sm border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                >
                  <option value="general">General (Everyone)</option>
                  <option value="elder">Elderly Strategy</option>
                  <option value="toddlers">Toddler Focus</option>
                  <option value="kid8">8yo Focus</option>
                  <option value="security">Security Alert</option>
                  <option value="dress-code">Dress Code Warning</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">Special Guide Alert / Subtext (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., 🧓 Elder Strategy: Benches nearby."
                  value={newFocusText}
                  onChange={(e) => setNewFocusText(e.target.value)}
                  className="w-full text-sm border border-slate-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  id="btn-cancel-activity"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-save-activity"
                  className="text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 px-3.5 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Timeline Loop */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-900">No activities fit this filter</p>
          <p className="text-xs text-slate-500 mt-1">Try switching to the "All" tab or add a new custom activity.</p>
        </div>
      ) : (
        <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-8">
          {filteredActivities.map((act) => {
            const isCompleted = !!completedActivities[act.id];
            const isCustom = act.id.startsWith('custom-');
            
            return (
              <div key={act.id} className="relative group/item animate-fade-in" id={`activity-${act.id}`}>
                
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 bg-white p-0.5 rounded-full z-10">
                  <button 
                    id={`toggle-complete-${act.id}`}
                    onClick={() => toggleCompleted(act.id)}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
                    title={isCompleted ? "Mark incomplete" : "Mark as visited"}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400 bg-white" />
                    )}
                  </button>
                </div>

                {/* Card Container */}
                <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isCompleted 
                    ? 'border-emerald-100 bg-emerald-50/10' 
                    : 'border-slate-100/80 bg-white hover:border-slate-200 hover:shadow-2xs'
                }`}>
                  
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-1 shrink-0 p-1 bg-slate-55 border border-slate-100/60 rounded-lg text-slate-600">
                        {getActivityIcon(act.icon)}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold font-mono text-sky-600 uppercase tracking-tight flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {act.time}
                          </span>
                          {act.location && (
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              {act.location}
                            </span>
                          )}
                        </div>
                        <h4 className={`text-base font-display font-semibold text-slate-900 mt-1 leading-snug ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                          {act.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      {getFocusBadge(act.focusType, act.focusText)}
                      {isCustom && (
                        <button
                          id={`delete-custom-${act.id}`}
                          onClick={() => handleDeleteCustomActivity(act.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Custom Activity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-slate-600 text-sm mt-3 leading-relaxed ${isCompleted ? 'text-slate-400/80' : ''}`}>
                    {act.description}
                  </p>

                  {/* Sub-Focus Special Bullet */}
                  {act.focusText && !isCompleted && (
                    <div className={`mt-3.5 p-3 rounded-xl text-xs flex items-start gap-2.5 border ${
                      act.focusType === 'elder' ? 'bg-rose-50/50 border-rose-100/50 text-rose-800' :
                      act.focusType === 'toddlers' ? 'bg-emerald-50/50 border-emerald-100/50 text-emerald-800' :
                      act.focusType === 'kid8' ? 'bg-amber-50/50 border-amber-100/50 text-amber-800' :
                      act.focusType === 'security' ? 'bg-red-50/50 border-red-100/50 text-red-800 font-semibold' :
                      'bg-slate-50 border-slate-100 text-slate-700'
                    }`}>
                      {act.focusType === 'elder' && <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                      {act.focusType === 'toddlers' && <Footprints className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                      {act.focusType === 'kid8' && <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                      {act.focusType === 'security' && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                      {act.focusType === 'dress-code' && <ShieldCheck className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />}
                      <span>{act.focusText}</span>
                    </div>
                  )}

                  {/* Personal Notes Box */}
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-wide font-mono">
                      <FileText className="w-3 h-3" />
                      Family Notes / Memory Log
                    </div>
                    <textarea
                      id={`notes-textarea-${act.id}`}
                      placeholder="Add travel notes, details, confirmation codes, or capture memories..."
                      value={activityNotes[act.id] || ''}
                      onChange={(e) => handleNoteChange(act.id, e.target.value)}
                      rows={1}
                      className="w-full bg-slate-50 border border-slate-100/80 rounded-lg p-2 text-xs text-slate-700 outline-none focus:bg-white focus:border-sky-300 focus:ring-1 focus:ring-sky-200 transition-all resize-y"
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
