import { Car, Home, AlertTriangle, ShieldCheck, Plane, FileText, CheckCircle } from 'lucide-react';

export default function QuickReference() {
  const cards = [
    {
      id: 'ref-car',
      title: 'Rental Car Logistics',
      icon: <Car className="w-5 h-5 text-sky-500" />,
      bg: 'bg-sky-50/40 border-sky-100',
      items: [
        'Day 1: Pick up Minivan at D.C. airport (09:00 AM).',
        'Central Hub: Ronald Reagan (RR) Building Parking Garage.',
        'Day 4 (Manhattan): Drop family & bags at Hyatt Centric (01:30 PM).',
        'Drop-off: Return minivan to Midtown West 54/55th St by 02:00 PM to skip exorbitant hotel parking fees.'
      ]
    },
    {
      id: 'ref-stays',
      title: 'Accommodation Details',
      icon: <Home className="w-5 h-5 text-emerald-500" />,
      bg: 'bg-emerald-50/40 border-emerald-100',
      items: [
        'Days 1-3: Washington D.C. Family Airbnb (Check-in Day 1, 04:00 PM).',
        'Days 4-6: Hyatt Centric Times Square, Manhattan (Check-in Day 4, 02:00 PM).',
        'Checkout: Tuesday, July 14th (11:30 AM). Luggage can be stored safely with the bell desk.'
      ]
    },
    {
      id: 'ref-dress',
      title: 'Dress Code & Rules',
      icon: <ShieldCheck className="w-5 h-5 text-violet-500" />,
      bg: 'bg-violet-50/40 border-violet-100',
      items: [
        'BAPS Akshardham Temple: Shoulders and knees must be covered for everyone entering the temple grounds.',
        'Summit One Vanderbilt: Wear pants/shorts (mirrored floors!), sunglasses (intense reflection), and stroller must be collapsible.'
      ]
    },
    {
      id: 'ref-alerts',
      title: 'Security & Safety Warnings',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      bg: 'bg-rose-50/40 border-rose-100',
      items: [
        'US Capitol Security: Strict no-food/no-liquids policy for adults. Kids baby food, formula, and milk are exempt.',
        'Reflecting Pool Safety: Stonework drops directly into water with no guardrails. Grip toddlers hands firmly.'
      ]
    },
    {
      id: 'ref-transit',
      title: 'Departure & Flight Home',
      icon: <Plane className="w-5 h-5 text-indigo-500" />,
      bg: 'bg-indigo-50/40 border-indigo-100',
      items: [
        'Tuesday, July 14th: Free afternoon in Midtown.',
        '05:00 PM: Pre-booked private passenger van arrives at Hyatt Centric door for direct airport transit.',
        '08:30 PM: Fly out of LaGuardia (LGA) back home to Atlanta (ATL).'
      ]
    },
    {
      id: 'ref-tickets',
      title: 'Pre-Booked Passes Check',
      icon: <FileText className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-50/40 border-amber-100',
      items: [
        '✔ Air & Space Museum: Free timed-entry passes (7 travelers).',
        '✔ Statue City Cruises Ferry: 3-year-old Zoe requires a registered free ticket.',
        '✔ U.S. Capitol Tour: Timed reservation.'
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300" id="quick-reference">
      <div className="mb-6">
        <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">
          Quick-Reference Cheat Sheets
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          Essential guidelines, dress codes, security restrictions, and logistics at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`p-5 rounded-2xl border ${card.bg} dark:bg-slate-950/45 dark:border-slate-800/80 flex flex-col`} id={card.id}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/40 dark:border-slate-800/85 mb-3">
              <span className="p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-2xs">
                {card.icon}
              </span>
              <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">
                {card.title}
              </h4>
            </div>

            <ul className="space-y-2.5 flex-1">
              {card.items.map((item, index) => (
                <li key={index} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
