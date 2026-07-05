import { Traveler, DayItinerary, PackingItem, Expense } from './types';

export const TRAVELERS: Traveler[] = [
  {
    id: 't1',
    name: 'Grandpa & Grandma',
    type: 'grandparents',
    avatar: '🧓👵',
    notes: [
      'Elder Strategy: Utilize wide, flat pathways and take advantage of benches.',
      'Capitol: Free loaner wheelchairs are available inside the Visitor Center—ask staff in red jackets.',
      'Lincoln Memorial: Skip the 87 steps! Elevator is on the lower-left ground side.'
    ]
  },
  {
    id: 't2',
    name: 'Parents (Mom & Dad)',
    type: 'parents',
    avatar: '👩‍🦰👨‍🦳',
    notes: [
      'Minivan drivers and overall logistics managers.',
      'Security Warning: No outside food/liquids for adults in Capitol (kids baby food/milk allowed).',
      'Summit One Vanderbilt: Wear pants/shorts (mirrored floors), bring sunglasses, collapsible stroller.'
    ]
  },
  {
    id: 't3',
    name: 'Leo (8 years old)',
    type: 'kid8',
    age: 8,
    avatar: '👦',
    notes: [
      'Focus: Dinosaurs, Geology (Hope Diamond) at NMNH.',
      'Focus: Rockets and spacecraft at National Air & Space Museum.',
      'Summit One Vanderbilt mirrored reflections interest.'
    ]
  },
  {
    id: 't4',
    name: 'Lily & Zoe (4 & 3 years old)',
    type: 'toddlers',
    avatar: '👧👶',
    notes: [
      'Wonderplace play area at Museum of American History (indoor climb).',
      'Reflecting Pool safety warning: Stone edges drop straight into water without guardrails.',
      'Heckscher Playground water features in NYC Central Park.',
      'SeaGlass & Jane\'s Carousels—must be supervised.'
    ]
  }
];

export const ITINERARY: DayItinerary[] = [
  {
    dayNumber: 1,
    dateStr: 'Thursday, July 9th',
    title: 'Arrival, Fossils, and Play',
    destination: 'Washington D.C.',
    activities: [
      {
        id: 'd1-a1',
        time: '09:00 AM',
        title: 'Airport Arrival & Minivan Pickup',
        description: 'Land at the airport, collect all bags, and pick up your rental minivan.',
        focusType: 'general',
        focusText: 'Parents handle the rental car desk and load all large luggage into the trunk.',
        location: 'D.C. Airport (IAD / DCA)',
        icon: 'Plane'
      },
      {
        id: 'd1-a2',
        time: '10:30 AM',
        title: 'Park at Ronald Reagan Building Garage',
        description: 'Drive directly to the Ronald Reagan (RR) Building Parking Garage. Leave all large suitcases safely locked in the trunk. This is our secure central hub.',
        focusType: 'general',
        location: 'Ronald Reagan Building Parking Garage',
        icon: 'ParkingSquare'
      },
      {
        id: 'd1-a3',
        time: '11:00 AM - 01:30 PM',
        title: 'National Museum of Natural History',
        description: 'Walk across the street to explore the amazing world of nature.',
        focusType: 'kid8',
        focusText: '👦 Leo Focus: Hall of Fossils (dinosaurs) and the Geology, Gems, and Minerals Exhibit to see the Hope Diamond.',
        location: 'National Museum of Natural History',
        icon: 'Dinosaur'
      },
      {
        id: 'd1-a3-elder',
        time: '11:00 AM - 01:30 PM',
        title: 'Elder Comfort Strategy',
        description: 'Utilize the wide, flat pathways throughout the museum. Benches are available on every level for resting.',
        focusType: 'elder',
        focusText: '🧓 Grandparents: Ample benches on every level. Flat surfaces, elevator-accessible floors.',
        location: 'National Museum of Natural History',
        icon: 'Heart'
      },
      {
        id: 'd1-a4',
        time: '01:30 PM - 02:00 PM',
        title: 'Relaxed Lunch at Museum Cafe',
        description: 'Eat a relaxed lunch together at the museum\'s on-site cafe to keep energy up and avoid walking too far.',
        focusType: 'general',
        location: 'Natural History Museum Cafe',
        icon: 'Utensils'
      },
      {
        id: 'd1-a5',
        time: '02:00 PM - 03:30 PM',
        title: 'National Museum of American History',
        description: 'Walk next door to the American History Museum for exhibits and toddler play.',
        focusType: 'toddlers',
        focusText: '👧 Lily & Zoe Focus: Head straight to Wegmans Wonderplace, a beautiful enclosed indoor playground perfect for 3- and 4-year-old girls to safely climb and play.',
        location: 'National Museum of American History',
        icon: 'Play'
      },
      {
        id: 'd1-a6',
        time: '04:00 PM',
        title: 'Airbnb Check-In & Unwind',
        description: 'Walk back to the Ronald Reagan Garage, pick up the minivan, and drive to your Airbnb to check in, unpack, and relax for the evening.',
        focusType: 'general',
        location: 'Airbnb (D.C.)',
        icon: 'Home'
      }
    ]
  },
  {
    dayNumber: 2,
    dateStr: 'Friday, July 10th',
    title: 'Congress Tour & The White House',
    destination: 'Washington D.C.',
    activities: [
      {
        id: 'd2-a1',
        time: 'Morning',
        title: 'Drive to RR Garage & Lyft to Capitol Visitor Center',
        description: 'Drive from the Airbnb, park at the RR Garage, and take a Lyft XL straight to the underground entrance of the U.S. Capitol Visitor Center. Arrive 30 minutes early.',
        focusType: 'general',
        location: 'Capitol Visitor Center',
        icon: 'Car'
      },
      {
        id: 'd2-a2',
        time: 'Capitol Tour',
        title: 'U.S. Capitol Tour & Wheelchair Strategy',
        description: 'Enjoy a historic tour of the Capitol. Red jackets indicate staff members who can provide free loaner wheelchairs.',
        focusType: 'elder',
        focusText: '🧓 Elder Strategy: Free loaner wheelchairs are available inside the Capitol. Just ask any staff member wearing a red jacket.',
        location: 'U.S. Capitol',
        icon: 'CheckSquare'
      },
      {
        id: 'd2-a3',
        time: 'Security Alert',
        title: 'U.S. Capitol Security Restrictions',
        description: 'Strict security checklist at the Capitol. Plan ahead!',
        focusType: 'security',
        focusText: '⚠️ Security Warning: No outside food or liquids are permitted for adults. Processed baby food, formula, and milk are the only exceptions.',
        location: 'U.S. Capitol',
        icon: 'AlertTriangle'
      },
      {
        id: 'd2-a4',
        time: '12:30 PM - 02:00 PM',
        title: 'Lunch at Ronald Reagan Building Food Court',
        description: 'Take a Lyft XL back to the RR Building\'s massive lower-level food court. It offers a relaxed environment with dozens of options and plenty of family-sized seating.',
        focusType: 'general',
        location: 'Ronald Reagan Building Food Court',
        icon: 'Utensils'
      },
      {
        id: 'd2-a5',
        time: '02:30 PM - 04:00 PM',
        title: 'White House Photos at Lafayette Square',
        description: 'Take a Lyft XL to Lafayette Square (the park immediately north of the White House).',
        focusType: 'elder',
        focusText: '💡 Why this works: It is completely flat, heavily shaded by mature trees, and has lots of park benches. It offers the closest, safest view of the White House without exhausting walks.',
        location: 'Lafayette Square (White House View)',
        icon: 'Camera'
      }
    ]
  },
  {
    dayNumber: 3,
    dateStr: 'Saturday, July 11th',
    title: 'Space, Lincoln Memorial & Herndon Dinner',
    destination: 'Washington D.C.',
    activities: [
      {
        id: 'd3-a1',
        time: '10:00 AM - 01:00 PM',
        title: 'National Air and Space Museum',
        description: 'Park at RR Garage. Take a Lyft XL to the National Air and Space Museum. Features massive rockets, spacecraft, and airplanes hanging from the ceiling.',
        focusType: 'kid8',
        focusText: '👦 Leo Focus: Highlights include real Lunar Modules, supersonic jets, and hands-on activities.',
        location: 'National Air and Space Museum',
        icon: 'Rocket'
      },
      {
        id: 'd3-a2',
        time: 'Ticket Reminder',
        title: 'Pre-booked Tickets Check',
        description: 'Ensure you have pre-booked your free timed-entry passes online for all 7 family members.',
        focusType: 'security',
        focusText: '❗ Action Required: Pre-booked free timed-entry passes must be saved on phone or printed.',
        location: 'National Air & Space Museum Entrance',
        icon: 'Calendar'
      },
      {
        id: 'd3-a3',
        time: '01:00 PM - 02:00 PM',
        title: 'Family Lunch Break',
        description: 'Enjoy lunch at the Air & Space Museum cafe or nearby dining spots.',
        focusType: 'general',
        location: 'National Mall Cafe / Nearby',
        icon: 'Utensils'
      },
      {
        id: 'd3-a4',
        time: '02:15 PM - 04:00 PM',
        title: 'Lincoln Memorial Exploration',
        description: 'Take a Lyft XL directly to the side drop-off of the Lincoln Memorial. Explore the majestic statue and views.',
        focusType: 'general',
        location: 'Lincoln Memorial',
        icon: 'MapPin'
      },
      {
        id: 'd3-a5',
        time: '02:15 PM - 04:00 PM',
        title: 'Lincoln Memorial Elevator Route',
        description: 'Skip the 87 stone stairs! Head to the ground level on the lower-left side to find a clean, climate-controlled elevator.',
        focusType: 'elder',
        focusText: '🧓 Elder Strategy: Guide grandparents to the lower-left ground-level side of the monument to find a hidden elevator that goes straight into the main chamber.',
        location: 'Lincoln Memorial Left Entrance',
        icon: 'Heart'
      },
      {
        id: 'd3-a6',
        time: '02:15 PM - 04:00 PM',
        title: 'Reflecting Pool Safety Watch',
        description: 'Stay safe near the water!',
        focusType: 'toddlers',
        focusText: '👧 Toddler Strategy: Keep a firm grip on the girls\' hands near the Reflecting Pool. The stone edges drop directly into deep water without guardrails.',
        location: 'Lincoln Memorial Reflecting Pool',
        icon: 'AlertTriangle'
      },
      {
        id: 'd3-a7',
        time: '04:30 PM',
        title: 'Retrieve Minivan',
        description: 'Take a final Lyft XL back to the RR Garage to retrieve your minivan.',
        focusType: 'general',
        location: 'Ronald Reagan Building Garage',
        icon: 'Car'
      },
      {
        id: 'd3-a8',
        time: '05:30 PM',
        title: 'Family Dinner in Herndon, VA',
        description: 'Drive out to the suburbs for a delicious family dinner in Herndon, VA before returning to the Airbnb to pack for tomorrow\'s early departure.',
        focusType: 'general',
        location: 'Herndon, VA',
        icon: 'Utensils'
      }
    ]
  },
  {
    dayNumber: 4,
    dateStr: 'Sunday, July 12th',
    title: 'BAPS Akshardham & Manhattan Arrival',
    destination: 'New Jersey',
    activities: [
      {
        id: 'd4-a1',
        time: '06:30 AM',
        title: 'Early Departure (Beat the D.C. Traffic)',
        description: 'Depart the D.C. Airbnb early to beat Sunday morning highway traffic. Great opportunity for kids to nap in the car.',
        focusType: 'general',
        location: 'D.C. Airbnb to Robbinsville, NJ',
        icon: 'Map'
      },
      {
        id: 'd4-a2',
        time: '09:30 AM - 11:30 AM',
        title: 'BAPS Swaminarayan Akshardham Temple',
        description: 'Arrive at the stunning, hand-carved temple in Robbinsville, NJ. Tour the breathtaking complex and enjoy a vegetarian breakfast/lunch onsite.',
        focusType: 'dress-code',
        focusText: '👗 Dress Code Warning: Shoulders and knees must be covered for all visitors entering the temple complex.',
        location: 'BAPS Akshardham, NJ',
        icon: 'Eye'
      },
      {
        id: 'd4-a3',
        time: '11:30 AM',
        title: 'Drive into Manhattan & Hotel Luggage Drop',
        description: 'Drive straight into Manhattan to the Hyatt Centric Times Square. At 01:30 PM, drop off passengers and all suitcases at the hotel\'s front door.',
        focusType: 'general',
        location: 'Hyatt Centric Times Square, NYC',
        icon: 'Home'
      },
      {
        id: 'd4-a4',
        time: '02:00 PM',
        title: 'Return Rental Minivan (No City Parking Fees!)',
        description: 'The driver will immediately return the minivan to the nearby Midtown rental branch (West 54th or 55th St) to completely avoid expensive NYC hotel parking fees.',
        focusType: 'general',
        focusText: 'Parents: Save money by returning the vehicle early! Manhattan is best explored walking, by subway, or taxi.',
        location: 'Midtown Car Rental Branch',
        icon: 'Car'
      },
      {
        id: 'd4-a5',
        time: '03:00 PM - 06:00 PM',
        title: 'Central Park Play & Fifth Avenue Stroll',
        description: 'Walk up Fifth Avenue toward the south end of Central Park. Rest, play, and window shop.',
        focusType: 'toddlers',
        focusText: '👧 Lily & Zoe Focus: Explore Heckscher Playground\'s amazing water spray features (bring a towel/change of clothes!). See Rockefeller Center exterior and Columbus Circle shops.',
        location: 'Central Park South & Fifth Ave',
        icon: 'Smile'
      },
      {
        id: 'd4-a6',
        time: '06:30 PM',
        title: 'Family-Style Times Square Dinner',
        description: 'Eat a family-style dinner in Times Square. Big portions are great for sharing among grandparents, parents, and kids.',
        focusType: 'general',
        location: 'Times Square, NYC',
        icon: 'Utensils'
      },
      {
        id: 'd4-a7',
        time: 'Night',
        title: 'Times Square Evening Walk',
        description: 'Take a relaxed, kid-friendly evening stroll through the bright lights of Times Square, right outside your hotel. Beautiful photo opportunities!',
        focusType: 'general',
        location: 'Times Square',
        icon: 'Camera'
      }
    ]
  },
  {
    dayNumber: 5,
    dateStr: 'Monday, July 13th',
    title: 'Lower Manhattan, Liberty & Brooklyn Sunset',
    destination: 'New York City',
    activities: [
      {
        id: 'd5-a1',
        time: '09:15 AM',
        title: 'Taxi or Subway to Lower Manhattan',
        description: 'Travel from the hotel down to Lower Manhattan. Start early to catch the ferry.',
        focusType: 'general',
        location: 'Midtown to Financial District',
        icon: 'Map'
      },
      {
        id: 'd5-a2',
        time: '10:00 AM',
        title: '9/11 Memorial & Charging Bull',
        description: 'Visit the peaceful 9/11 Memorial Plaza reflecting pools and walk over to see the Charging Bull at Bowling Green.',
        focusType: 'general',
        focusText: '♿ Accessible: Both areas are flat, spacious, and fully stroller and wheelchair accessible.',
        location: 'World Trade Center & Bowling Green',
        icon: 'Eye'
      },
      {
        id: 'd5-a3',
        time: '11:00 AM',
        title: 'Statue of Liberty Ferry',
        description: 'Board the Statue City Cruises ferry at Battery Park to explore Liberty Island and stand near Lady Liberty.',
        focusType: 'security',
        focusText: '⚠️ Free ticket needed: Your 3-year-old Zoe requires a registered free ticket even though there is no charge.',
        location: 'Battery Park Ferry Dock',
        icon: 'Ship'
      },
      {
        id: 'd5-a4',
        time: '02:30 PM',
        title: 'SeaGlass Carousel Ride',
        description: 'Return to Battery Park and treat the kids to a quick ride on the stunning SeaGlass Carousel near the dock. It features glowing fish that move gracefully.',
        focusType: 'toddlers',
        focusText: '👧🧒 Kids Focus: A magical underwater-themed carousel ride!',
        location: 'Battery Park',
        icon: 'Star'
      },
      {
        id: 'd5-a5',
        time: '03:15 PM',
        title: 'Mandatory Afternoon Nap/Rest Time',
        description: 'Take a taxi back to the hotel for a mandatory afternoon rest and nap for the toddlers and grandparents to recharge.',
        focusType: 'elder',
        focusText: '🧓👧 Core Rest Strategy: Non-negotiable downtime. Essential for keeping kids and elders happy for the night view!',
        location: 'Hyatt Centric Times Square',
        icon: 'Moon'
      },
      {
        id: 'd5-a6',
        time: '05:30 PM',
        title: 'Heading to DUMBO, Brooklyn',
        description: 'Take a taxi or the subway (A or C train) down to DUMBO, Brooklyn.',
        focusType: 'general',
        location: 'Midtown to Brooklyn',
        icon: 'Map'
      },
      {
        id: 'd5-a7',
        time: '06:15 PM',
        title: 'Jane\'s Carousel in Brooklyn Bridge Park',
        description: 'Arrive at Brooklyn Bridge Park and ride Jane\'s Carousel (open until 6:50 PM on summer Mondays). Housed in a gorgeous glass pavilion.',
        focusType: 'toddlers',
        focusText: '👧🧒 Kids Focus: Classic carousel with stellar bridge views. Closes at 6:50 PM!',
        location: 'DUMBO, Brooklyn',
        icon: 'Smile'
      },
      {
        id: 'd5-a8',
        time: '06:45 PM',
        title: 'Early Casual Dinner in DUMBO',
        description: 'Grab an early, casual dinner in DUMBO (lots of great pizza and burger spots nearby).',
        focusType: 'general',
        location: 'DUMBO, Brooklyn',
        icon: 'Utensils'
      },
      {
        id: 'd5-a9',
        time: '07:45 PM - 08:45 PM',
        title: 'Brooklyn Bridge Sunset Walk',
        description: 'Walk across the Brooklyn Bridge from Brooklyn back into Manhattan.',
        focusType: 'general',
        focusText: '📸 Pro-tip: Walking this direction puts the beautiful 8:27 PM sunset and the Manhattan skyline directly in front of you. Perfect photo lighting!',
        location: 'Brooklyn Bridge',
        icon: 'Camera'
      }
    ]
  },
  {
    dayNumber: 6,
    dateStr: 'Tuesday, July 14th',
    title: 'Summit Views, Shopping & Flight Home',
    destination: 'New York City',
    activities: [
      {
        id: 'd6-a1',
        time: '09:00 AM',
        title: 'Summit One Vanderbilt Views',
        description: 'Experience the immersive, mind-bending glass and mirror views at Summit One Vanderbilt. Located right next to Grand Central in Midtown.',
        focusType: 'dress-code',
        focusText: '👗 Rules Checklist: Wear pants instead of skirts (mirrored floors!), bring sunglasses (intense reflections), and ensure your stroller is fully collapsible.',
        location: 'Summit One Vanderbilt',
        icon: 'Eye'
      },
      {
        id: 'd6-a2',
        time: '11:30 AM',
        title: 'Hotel Checkout & Luggage Drop',
        description: 'Return to the Hyatt Centric, check out of your rooms, and leave your luggage safely with the complimentary bell desk.',
        focusType: 'general',
        location: 'Hyatt Centric Times Square',
        icon: 'Home'
      },
      {
        id: 'd6-a3',
        time: '12:00 PM',
        title: 'Final Midtown Lunch',
        description: 'Grab a final delicious lunch together in Midtown NYC.',
        focusType: 'general',
        location: 'Midtown Manhattan',
        icon: 'Utensils'
      },
      {
        id: 'd6-a4',
        time: '01:00 PM - 04:30 PM',
        title: 'Fifth Avenue Shopping & Rockefeller Plaza',
        description: 'Spend a completely relaxed afternoon finishing up Fifth Avenue shopping, exploring missed spots in Rockefeller Plaza (like the Nintendo flagship store), or just resting in a shaded plaza.',
        focusType: 'kid8',
        focusText: '👦 Leo Focus: The giant Nintendo flagship store at Rockefeller Center is a major hit for kids!',
        location: 'Rockefeller Center & Fifth Ave',
        icon: 'Smile'
      },
      {
        id: 'd6-a5',
        time: '05:00 PM',
        title: 'Private Passenger Van to LGA',
        description: 'Meet your pre-booked private passenger van at the hotel front door for direct, easy transit to the airport with all luggage.',
        focusType: 'general',
        location: 'Hyatt Centric to LaGuardia Airport',
        icon: 'Car'
      },
      {
        id: 'd6-a6',
        time: '08:30 PM',
        title: 'Flight back to Atlanta',
        description: 'Fly out of LaGuardia Airport (LGA) back home to Atlanta. Safe travels, family!',
        focusType: 'general',
        location: 'LaGuardia Airport (LGA)',
        icon: 'Plane'
      }
    ]
  }
];

export const INITIAL_PACKING_LIST: PackingItem[] = [
  // Grandparents
  { id: 'p1', category: 'Health & Comfort', item: 'Prescription medications & pill organizer', packed: false, assignee: 'grandparents' },
  { id: 'p2', category: 'Health & Comfort', item: 'Comfortable walking shoes with good support', packed: false, assignee: 'grandparents' },
  { id: 'p3', category: 'Health & Comfort', item: 'Light sweater or wrap for air-conditioned museums', packed: false, assignee: 'grandparents' },
  { id: 'p4', category: 'Health & Comfort', item: 'Sunglasses and sun hats', packed: false, assignee: 'grandparents' },
  
  // Parents
  { id: 'p5', category: 'Logistics', item: 'Printed copy of all reservations (Airbnb, Hotel, Car, Flights)', packed: false, assignee: 'parents' },
  { id: 'p6', category: 'Logistics', item: 'D.C. Capitol & Air/Space booked entry passes (QR codes)', packed: false, assignee: 'parents' },
  { id: 'p7', category: 'Logistics', item: 'Fully collapsible lightweight stroller for the toddlers', packed: false, assignee: 'parents' },
  { id: 'p8', category: 'Logistics', item: 'Diaper bag supplies (wipes, diapers, change of clothes)', packed: false, assignee: 'parents' },
  { id: 'p9', category: 'Clothing', item: 'Outfits covering shoulders and knees (for BAPS Temple)', packed: false, assignee: 'parents' },
  { id: 'p10', category: 'Clothing', item: 'Pants/shorts (no skirts) for Summit One Vanderbilt', packed: false, assignee: 'parents' },
  { id: 'p11', category: 'Electronics', item: 'Phone chargers & portable battery power banks', packed: false, assignee: 'parents' },

  // Leo (8yo)
  { id: 'p12', category: 'Kids Fun', item: 'Small sketchpad or notebook for dinosaur/space sketches', packed: false, assignee: 'kid8' },
  { id: 'p13', category: 'Kids Clothing', item: 'Comfortable sneakers & active wear', packed: false, assignee: 'kid8' },
  { id: 'p14', category: 'Kids Fun', item: 'Kid sunglasses & water bottle', packed: false, assignee: 'kid8' },

  // Toddlers (Zoe & Lily)
  { id: 'p15', category: 'Toddlers Needs', item: 'Processed baby food, toddler snacks, and formula/milk', packed: false, assignee: 'toddlers' },
  { id: 'p16', category: 'Toddlers Needs', item: 'Swimsuits / water clothes for Heckscher water playground', packed: false, assignee: 'toddlers' },
  { id: 'p17', category: 'Toddlers Needs', item: 'Small travel towels & wet bags', packed: false, assignee: 'toddlers' },
  { id: 'p18', category: 'Toddlers Needs', item: 'Favorite small plushies or blankets for flight and napping', packed: false, assignee: 'toddlers' },
  
  // All
  { id: 'p19', category: 'General', item: 'Government IDs and flight boarding passes', packed: false, assignee: 'all' },
  { id: 'p20', category: 'General', item: 'Refillable insulated water bottles', packed: false, assignee: 'all' },
  { id: 'p21', category: 'General', item: 'Hand sanitizer & wet wipes', packed: false, assignee: 'all' }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'e1',
    title: 'Minivan Rental (6 Days)',
    amount: 520.00,
    paidBy: 'Parents (Mom & Dad)',
    splitBetween: ['Grandpa & Grandma', 'Parents (Mom & Dad)'],
    category: 'Transport',
    date: '2026-07-09'
  },
  {
    id: 'e2',
    title: 'Ronald Reagan Building Parking (Day 1)',
    amount: 25.00,
    paidBy: 'Parents (Mom & Dad)',
    splitBetween: ['Parents (Mom & Dad)'],
    category: 'Transport',
    date: '2026-07-09'
  },
  {
    id: 'e3',
    title: 'Hyatt Centric Times Square Hotel',
    amount: 1450.00,
    paidBy: 'Parents (Mom & Dad)',
    splitBetween: ['Grandpa & Grandma', 'Parents (Mom & Dad)'],
    category: 'Hotel',
    date: '2026-07-12'
  },
  {
    id: 'e4',
    title: 'Statue City Cruises Ferry Tickets',
    amount: 98.00,
    paidBy: 'Grandpa & Grandma',
    splitBetween: ['Grandpa & Grandma', 'Parents (Mom & Dad)'],
    category: 'Activities',
    date: '2026-07-13'
  },
  {
    id: 'e5',
    title: 'Summit One Vanderbilt Tickets',
    amount: 172.00,
    paidBy: 'Parents (Mom & Dad)',
    splitBetween: ['Grandpa & Grandma', 'Parents (Mom & Dad)'],
    category: 'Activities',
    date: '2026-07-14'
  }
];
