import { useState, useEffect } from 'react';
import { Clock, Calendar, Compass, MapPin } from 'lucide-react';

export default function CountdownWidget() {
  // Target date: July 9, 2026, 09:00 AM (Arrival in D.C.)
  const targetDate = new Date('2026-07-09T09:00:00-04:00'); // EDT
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isArrived: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isArrived: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden" id="countdown-widget">
      {/* Background decoration */}
      <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
        <Compass className="w-48 h-48 rotate-12" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sky-400 font-medium tracking-wide uppercase text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Adventure Countdown
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
            East Coast Family Journey
          </h2>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            July 9th – July 14th, 2026
            <span className="text-slate-600">•</span>
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            7 Travelers, 3 States
          </p>
        </div>

        {timeLeft.isArrived ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-3 rounded-xl flex items-center gap-3">
            <Compass className="w-6 h-6 animate-spin-slow text-emerald-400" />
            <div>
              <p className="font-semibold text-sm">Trip is Active!</p>
              <p className="text-xs text-emerald-400/80">Follow the schedule & enjoy the memories.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-4 font-mono">
            <div className="text-center bg-slate-800/80 border border-slate-700/50 rounded-xl px-3 py-2.5 min-w-[64px]">
              <span className="block text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Days</span>
            </div>
            <div className="text-slate-700 text-xl font-sans font-light">:</div>
            <div className="text-center bg-slate-800/80 border border-slate-700/50 rounded-xl px-3 py-2.5 min-w-[64px]">
              <span className="block text-2xl md:text-3xl font-bold text-sky-400">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Hours</span>
            </div>
            <div className="text-slate-700 text-xl font-sans font-light">:</div>
            <div className="text-center bg-slate-800/80 border border-slate-700/50 rounded-xl px-3 py-2.5 min-w-[64px]">
              <span className="block text-2xl md:text-3xl font-bold text-sky-400">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Min</span>
            </div>
            <div className="text-slate-700 text-xl font-sans font-light">:</div>
            <div className="text-center bg-slate-800/80 border border-slate-700/50 rounded-xl px-3 py-2.5 min-w-[64px]">
              <span className="block text-2xl md:text-3xl font-bold text-slate-400">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Sec</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
