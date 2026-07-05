export type TravelerType = 'grandparents' | 'parents' | 'kid8' | 'toddlers';

export interface Traveler {
  id: string;
  name: string;
  type: TravelerType;
  age?: number;
  avatar: string;
  notes: string[];
}

export type FocusGroup = 'kid8' | 'toddlers' | 'security' | 'dress-code' | 'general';

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  focusType: FocusGroup;
  focusText?: string;
  location?: string;
  icon?: string;
  costEstimate?: number;
}

export interface DayItinerary {
  dayNumber: number;
  dateStr: string; // e.g., "Thursday, July 9th"
  title: string;
  destination: 'Washington D.C.' | 'New Jersey' | 'New York City';
  activities: Activity[];
}

export interface PackingItem {
  id: string;
  category: string;
  item: string;
  packed: boolean;
  assignee: TravelerType | 'all';
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string; // traveler id or 'Shared'
  splitBetween: string[]; // traveler ids
  category: 'Transport' | 'Food' | 'Hotel' | 'Activities' | 'Other';
  date: string;
}

export interface JournalEntry {
  id: string;
  dayNumber: number;
  author: string;
  text: string;
  timestamp: string;
}
