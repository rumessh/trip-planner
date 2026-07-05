import { useState } from 'react';
import { TRAVELERS } from '../data';
import { Traveler } from '../types';
import { Shield, Sparkles, Heart, Footprints, Info } from 'lucide-react';

interface TravelerProfilesProps {
  onSelectTravelerType: (type: string | null) => void;
  selectedTravelerType: string | null;
}

export default function TravelerProfiles({ onSelectTravelerType, selectedTravelerType }: TravelerProfilesProps) {
  const [activeTab, setActiveTab] = useState<string | null>(selectedTravelerType);

  const handleSelect = (type: string) => {
    const nextVal = activeTab === type ? null : type;
    setActiveTab(nextVal);
    onSelectTravelerType(nextVal);
  };

  const getStrategyIcon = (type: string) => {
    switch (type) {
      case 'grandparents':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'parents':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'kid8':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'toddlers':
        return <Footprints className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  const getHighlightDescription = (type: string) => {
    switch (type) {
      case 'grandparents':
        return 'Focus on leisurely, self-paced sightseeing, historical architecture, and scenic outdoor gardens.';
      case 'parents':
        return 'Core coordination, minivan rental, early returns to avoid fees, security protocols, and stroller collapse rules.';
      case 'kid8':
        return 'Dinosaur hall, Hope Diamond, rockets & spaceships, and the 2-story Nintendo flagship store at Rockefeller.';
      case 'toddlers':
        return 'Wegmans Wonderplace, Central Park water fountains, SeaGlass carousel, and supervised carousel rides in Brooklyn.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300" id="traveler-profiles">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">
            Traveler Profiles & Custom Strategies
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Select a family member group to highlight their personalized trip activities & specific tips.
          </p>
        </div>
        {activeTab && (
          <button 
            id="clear-profile-filter"
            onClick={() => { setActiveTab(null); onSelectTravelerType(null); }}
            className="text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Clear Active Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {TRAVELERS.map((t) => {
          const isSelected = activeTab === t.type;
          return (
            <button
              id={`traveler-card-${t.type}`}
              key={t.id}
              onClick={() => handleSelect(t.type)}
              className={`p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isSelected 
                  ? 'border-sky-500 bg-sky-50/40 dark:bg-sky-950/20 ring-1 ring-sky-500 shadow-md' 
                  : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{t.avatar}</span>
                <span className="p-1.5 rounded-lg bg-white dark:bg-slate-900 shadow-xs">
                  {getStrategyIcon(t.type)}
                </span>
              </div>
              <h4 className="font-display font-semibold text-slate-900 dark:text-slate-100 mt-4 group-hover:text-sky-900 dark:group-hover:text-sky-300 transition-colors">
                {t.name}
              </h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider font-mono mt-0.5">
                {t.type === 'kid8' ? '8 Years Old' : t.type === 'toddlers' ? '3 & 4 Years Old' : t.type === 'grandparents' ? 'Grandparents' : 'Parents'}
              </p>
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 animate-fade-in">
          {TRAVELERS.filter(t => t.type === activeTab).map(t => (
            <div key={t.id}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="font-display font-semibold text-slate-900 dark:text-white leading-none">
                    {t.name} — Customized Guide & Tips
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {getHighlightDescription(t.type)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {t.notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-100/60 dark:border-slate-800 rounded-lg p-3 shadow-2xs">
                    <span className="text-sky-500 shrink-0 font-bold mt-0.5">✓</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
