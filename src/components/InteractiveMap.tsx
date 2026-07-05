import { useState } from 'react';
import { MapPin, ArrowRight, Navigation, HelpCircle, Compass } from 'lucide-react';
import { ITINERARY } from '../data';

interface InteractiveMapProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export default function InteractiveMap({ selectedDay, onSelectDay }: InteractiveMapProps) {
  const [mapTab, setMapTab] = useState<'overview' | 'dc' | 'nyc'>('overview');
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  // Overview points
  const overviewPoints = [
    { id: 'dc', name: 'Washington D.C.', x: 100, y: 220, days: [1, 2, 3], desc: 'Days 1-3: Museums, Monuments & Capitol' },
    { id: 'nj', name: 'Robbinsville, NJ', x: 220, y: 140, days: [4], desc: 'Day 4: BAPS Akshardham Temple' },
    { id: 'nyc', name: 'New York City, NY', x: 280, y: 90, days: [4, 5, 6], desc: 'Days 4-6: Times Square, Statue of Liberty, Summit & Brooklyn' }
  ];

  // DC Details
  const dcPoints = [
    { id: 'dc-1', name: 'Natural History Museum', x: 220, y: 120, day: 1, time: '11:00 AM', desc: '🦖 Dinosaurs & Hope Diamond' },
    { id: 'dc-2', name: 'American History Museum', x: 180, y: 120, day: 1, time: '02:00 PM', desc: '👧 Wegmans Wonderplace Play' },
    { id: 'dc-3', name: 'U.S. Capitol Visitor Center', x: 340, y: 130, day: 2, time: 'Morning', desc: '🏛️ Historic Guided Tour' },
    { id: 'dc-4', name: 'Lafayette Square (White House)', x: 120, y: 80, day: 2, time: '02:30 PM', desc: '📸 Shaded White House View' },
    { id: 'dc-5', name: 'Air and Space Museum', x: 260, y: 170, day: 3, time: '10:00 AM', desc: '🚀 Rockets & Spacecraft' },
    { id: 'dc-6', name: 'Lincoln Memorial', x: 60, y: 160, day: 3, time: '02:15 PM', desc: '🏛️ Majestic Memorial & Views' }
  ];

  // NYC Details
  const nycPoints = [
    { id: 'nyc-1', name: 'Hyatt Centric Times Square', x: 180, y: 130, day: 4, time: '01:30 PM', desc: '🏨 Hotel Base' },
    { id: 'nyc-2', name: 'Central Park (Heckscher)', x: 180, y: 70, day: 4, time: '03:00 PM', desc: '⛲ Water play & Playground' },
    { id: 'nyc-3', name: '9/11 Memorial & Charging Bull', x: 160, y: 220, day: 5, time: '10:00 AM', desc: '🐂 Memorial Plaza & Landmark' },
    { id: 'nyc-4', name: 'Battery Park & Liberty Ferry', x: 160, y: 260, day: 5, time: '11:00 AM', desc: '🗽 Statue Ferry & SeaGlass Carousel' },
    { id: 'nyc-5', name: 'DUMBO & Jane\'s Carousel', x: 250, y: 210, day: 5, time: '06:15 PM', desc: '🎠 Carousel & sunset walk back' },
    { id: 'nyc-6', name: 'Summit One Vanderbilt', x: 210, y: 120, day: 6, time: '09:00 AM', desc: '🏙️ Mirrored floor views' }
  ];

  const handlePointClick = (days: number[]) => {
    if (days.length > 0) {
      onSelectDay(days[0]);
      if (days.includes(1) && days.includes(2) && days.includes(3)) {
        setMapTab('dc');
      } else if (days.includes(5) || days.includes(6)) {
        setMapTab('nyc');
      }
    }
  };

  const getDayColor = (day: number) => {
    switch (day) {
      case 1: return 'fill-rose-500 stroke-rose-200';
      case 2: return 'fill-indigo-500 stroke-indigo-200';
      case 3: return 'fill-amber-500 stroke-amber-200';
      case 4: return 'fill-emerald-500 stroke-emerald-200';
      case 5: return 'fill-purple-500 stroke-purple-200';
      case 6: return 'fill-sky-500 stroke-sky-200';
      default: return 'fill-slate-400 stroke-slate-200';
    }
  };

  const getDayTextColor = (day: number) => {
    switch (day) {
      case 1: return 'text-rose-500';
      case 2: return 'text-indigo-500';
      case 3: return 'text-amber-500';
      case 4: return 'text-emerald-500';
      case 5: return 'text-purple-500';
      case 6: return 'text-sky-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col h-full transition-colors duration-300" id="interactive-map-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-500 animate-spin-slow" />
            Interactive Route Companion
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Synchronized with your itinerary. Tap cities or points to jump to that day.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl self-start sm:self-auto border border-slate-200/50 dark:border-slate-700/50">
          <button
            id="map-tab-overview"
            onClick={() => setMapTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              mapTab === 'overview' ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            id="map-tab-dc"
            onClick={() => setMapTab('dc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              mapTab === 'dc' ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            D.C. Mall
          </button>
          <button
            id="map-tab-nyc"
            onClick={() => setMapTab('nyc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              mapTab === 'nyc' ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            NYC Grid
          </button>
        </div>
      </div>

      {/* Map Stage */}
      <div className="bg-sky-50/20 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 rounded-xl relative overflow-hidden flex-1 min-h-[340px] flex items-center justify-center p-4">
        
        {/* VIEW 1: REGIONAL OVERVIEW */}
        {mapTab === 'overview' && (
          <svg viewBox="0 0 380 320" className="w-full h-full max-h-[300px] select-none">
            {/* Coastline Indicator */}
            <path d="M 50,300 Q 180,240 220,150 T 350,20" fill="none" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="8" strokeLinecap="round" />
            <path d="M 50,300 Q 180,240 220,150 T 350,20" fill="none" className="stroke-sky-200 dark:stroke-sky-900" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" strokeOpacity="0.8" />
            
            {/* Travel Route Line */}
            <path d="M 100,220 Q 160,180 220,140 T 280,90" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="5 5" className="animate-pulse" />

            {/* Ocean Label */}
            <text x="320" y="220" className="font-display font-medium text-[9px] fill-slate-300 dark:fill-slate-700 tracking-widest uppercase rotate-45">Atlantic Ocean</text>

            {/* Route Points */}
            {overviewPoints.map((pt) => {
              const isActive = pt.days.includes(selectedDay);
              return (
                <g 
                  key={pt.id} 
                  className="cursor-pointer group"
                  onClick={() => handlePointClick(pt.days)}
                  onMouseEnter={() => setHoveredPin(pt.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <circle cx={pt.x} cy={pt.y} r={isActive ? 12 : 8} className={`transition-all duration-300 ${isActive ? 'fill-sky-500/20 stroke-sky-400 stroke-2 animate-pulse' : 'fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 group-hover:fill-sky-50 dark:group-hover:fill-sky-950/30'}`} />
                  <circle cx={pt.x} cy={pt.y} r={isActive ? 6 : 4} className={`transition-all duration-300 ${isActive ? 'fill-sky-500' : 'fill-slate-400 dark:fill-slate-600 group-hover:fill-sky-400'}`} />
                  
                  {/* Label */}
                  <text 
                    x={pt.x + 12} 
                    y={pt.y + 4} 
                    className={`font-display text-[11px] font-semibold transition-all ${isActive ? 'fill-sky-950 dark:fill-sky-300 font-bold' : 'fill-slate-600 dark:fill-slate-400 group-hover:fill-sky-900 dark:group-hover:fill-sky-100'}`}
                  >
                    {pt.name}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {/* VIEW 2: DC DETAILS */}
        {mapTab === 'dc' && (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] select-none">
            {/* Potomac River */}
            <path d="M 10,290 C 60,240 10,180 50,110 C 60,90 80,70 120,40" fill="none" className="stroke-sky-100 dark:stroke-sky-950/40" strokeWidth="24" strokeLinecap="round" />
            
            {/* National Mall Rectangles */}
            <rect x="60" y="130" width="300" height="30" className="fill-slate-150 dark:fill-slate-800" rx="4" />
            <rect x="150" y="135" width="130" height="20" className="fill-sky-200 dark:fill-sky-900" opacity="0.4" rx="2" /> {/* Reflecting Pool */}

            {/* White House Connection Street */}
            <line x1="180" y1="130" x2="180" y2="70" className="stroke-slate-150 dark:stroke-slate-800" strokeWidth="10" strokeLinecap="round" />

            {/* Labels */}
            <text x="10" y="40" className="font-display font-medium text-[8px] fill-slate-300 dark:fill-slate-700 tracking-wider uppercase">Potomac River</text>
            <text x="155" y="148" className="font-display font-medium text-[8px] fill-sky-400 dark:fill-sky-500 tracking-wide uppercase">Reflecting Pool</text>
            <text x="150" y="210" className="font-display text-[9px] fill-slate-300 dark:fill-slate-700 tracking-widest uppercase">The National Mall</text>

            {/* Pins */}
            {dcPoints.map((pt) => {
              const isActive = selectedDay === pt.day;
              return (
                <g 
                  key={pt.id} 
                  className="cursor-pointer group animate-fade-in"
                  onClick={() => onSelectDay(pt.day)}
                  onMouseEnter={() => setHoveredPin(pt.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <circle cx={pt.x} cy={pt.y} r={isActive ? 10 : 6} className={`transition-all duration-300 ${isActive ? 'fill-indigo-500/10 stroke-indigo-400 stroke-2 animate-ping' : 'fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 group-hover:fill-indigo-50'}`} />
                  <circle cx={pt.x} cy={pt.y} r={4} className={`transition-all duration-300 ${getDayColor(pt.day)}`} />
                  
                  {/* Text Label on hover or active */}
                  {(isActive || hoveredPin === pt.id) && (
                    <g>
                      <rect x={pt.x - 60} y={pt.y - 34} width="120" height="26" fill="#1e293b" rx="6" />
                      <text x={pt.x} y={pt.y - 23} textAnchor="middle" className="fill-white font-sans text-[8px] font-medium">{pt.name}</text>
                      <text x={pt.x} y={pt.y - 13} textAnchor="middle" className="fill-sky-300 font-mono text-[7px]">{pt.time} (Day {pt.day})</text>
                    </g>
                  )}
                  {(!isActive && hoveredPin !== pt.id) && (
                    <text x={pt.x} y={pt.y + 14} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-display text-[8px] font-semibold tracking-tight">{pt.name.split(' ')[0]}</text>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* VIEW 3: NYC GRID */}
        {mapTab === 'nyc' && (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] select-none">
            {/* Hudson River (Left) */}
            <path d="M 70,10 L 70,290" fill="none" className="stroke-sky-100 dark:stroke-sky-950/40" strokeWidth="20" strokeLinecap="round" />
            {/* East River (Right/Bottom) */}
            <path d="M 330,10 C 310,120 220,180 330,290" fill="none" className="stroke-sky-100 dark:stroke-sky-950/40" strokeWidth="20" strokeLinecap="round" />

            {/* Manhattan land strip simplified */}
            <path d="M 120,10 Q 240,20 240,150 T 180,290" fill="none" className="stroke-slate-100 dark:stroke-slate-800/60" strokeWidth="110" strokeLinecap="square" opacity="0.6" />

            {/* Central Park */}
            <rect x="160" y="30" width="40" height="50" className="fill-emerald-100 dark:fill-emerald-950/30 stroke-emerald-200 dark:stroke-emerald-900/60" rx="3" />
            <text x="180" y="58" textAnchor="middle" className="font-display font-medium text-[8px] fill-emerald-600 dark:fill-emerald-500 tracking-wide">Central Park</text>

            {/* Brooklyn Bridge representation */}
            <path d="M 190,240 Q 240,230 260,225" fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="4" />
            <text x="240" y="244" className="font-display font-medium text-[7px] fill-slate-400 dark:fill-slate-500 rotate-12">Brooklyn Bridge</text>

            {/* Labels */}
            <text x="20" y="150" className="font-display font-medium text-[8px] fill-slate-300 dark:fill-slate-700 tracking-wider uppercase -rotate-90">Hudson River</text>
            <text x="360" y="150" className="font-display font-medium text-[8px] fill-slate-300 dark:fill-slate-700 tracking-wider uppercase rotate-90">East River</text>

            {/* Pins */}
            {nycPoints.map((pt) => {
              const isActive = selectedDay === pt.day;
              return (
                <g 
                  key={pt.id} 
                  className="cursor-pointer group animate-fade-in"
                  onClick={() => onSelectDay(pt.day)}
                  onMouseEnter={() => setHoveredPin(pt.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <circle cx={pt.x} cy={pt.y} r={isActive ? 10 : 6} className={`transition-all duration-300 ${isActive ? 'fill-sky-500/10 stroke-sky-400 stroke-2 animate-ping' : 'fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 group-hover:fill-sky-50'}`} />
                  <circle cx={pt.x} cy={pt.y} r={4} className={`transition-all duration-300 ${getDayColor(pt.day)}`} />
                  
                  {/* Text Label on hover or active */}
                  {(isActive || hoveredPin === pt.id) && (
                    <g>
                      <rect x={pt.x - 65} y={pt.y - 34} width="130" height="26" fill="#1e293b" rx="6" />
                      <text x={pt.x} y={pt.y - 23} textAnchor="middle" className="fill-white font-sans text-[8px] font-medium">{pt.name}</text>
                      <text x={pt.x} y={pt.y - 13} textAnchor="middle" className="fill-sky-300 font-mono text-[7px]">{pt.time} (Day {pt.day})</text>
                    </g>
                  )}
                  {(!isActive && hoveredPin !== pt.id) && (
                    <text x={pt.x} y={pt.y + 14} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-display text-[8px] font-semibold tracking-tight">{pt.name.split(' ')[0]}</text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Mini details panel */}
      <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3 mt-4 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-sky-500 shrink-0" />
          <span>
            {mapTab === 'overview' && 'Showing: D.C. → NJ → NYC Multi-City Tour Route.'}
            {mapTab === 'dc' && 'Showing: Washington D.C. Mall, Capitol & Memorials.'}
            {mapTab === 'nyc' && 'Showing: Midtown, Central Park, Battery Park & DUMBO.'}
          </span>
        </div>
        <button
          id="map-day-selector"
          onClick={() => {
            const nextDay = selectedDay === 6 ? 1 : selectedDay + 1;
            onSelectDay(nextDay);
          }}
          className="text-[10px] font-mono tracking-tight text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
        >
          Day {selectedDay} active <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
