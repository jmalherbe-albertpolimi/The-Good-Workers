export type Category = 'Retail' | 'Logistics' | 'Events' | 'Catering' | 'Inventory' | 'Reception';

export type MissionStatus = 'proposed' | 'accepted' | 'refused' | 'done' | 'cancelled';

export interface Company {
  name: string;
  logoText: string;
  color: string;
}

export interface Mission {
  id: string;
  company: Company;
  category: Category;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  address: string;
  workersCount: number;
  description: string;
  dressCode: string;
  contact: string;
  status: MissionStatus;
  rating?: number;
  acceptedAt?: string;
  completedAt?: string;
}

export interface Message {
  id: string;
  missionId: string;
  from: 'staff' | 'worker';
  author: string;
  text: string;
  at: string;
}

export type StudyLevel = 'High school' | 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Year 5' | 'PhD' | 'Other';

export const STUDY_LEVELS: StudyLevel[] = ['High school', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'PhD', 'Other'];

export const ALL_CATEGORIES: Category[] = ['Retail', 'Logistics', 'Events', 'Catering', 'Inventory', 'Reception'];

export interface Profile {
  firstName: string;
  lastName: string;
  siret: string;
  phone: string;
  email: string;
  birthDate: string;
  school: string;
  studyLevel: StudyLevel | '';
  city: string;
  regions: string[];
  favoriteCategories: Category[];
  balance: number;
  memberSince: string;
  available: boolean;
  notifications: boolean;
  motivationLevel: number;
  validationStatus: 'pending' | 'validated';
}

export interface CategoryTheme {
  accent: string;
  bg: string;
  text: string;
}

export const CATEGORY_THEME: Record<Category, CategoryTheme> = {
  Retail: { accent: '#f0507c', bg: '#fde3ea', text: '#ffffff' },
  Logistics: { accent: '#3b82f6', bg: '#e0ebff', text: '#ffffff' },
  Events: { accent: '#8b5cf6', bg: '#ece5ff', text: '#ffffff' },
  Catering: { accent: '#f97316', bg: '#ffe8d6', text: '#ffffff' },
  Inventory: { accent: '#23b5b0', bg: '#dcf4f2', text: '#ffffff' },
  Reception: { accent: '#f7c948', bg: '#fff3cc', text: '#1f1f1f' },
};

export const ALL_REGIONS = [
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Occitanie',
  'Nouvelle-Aquitaine',
  'Hauts-de-France',
  "Provence-Alpes-Côte d'Azur",
  'Grand Est',
  'Pays de la Loire',
  'Brittany',
];

export const MOTIVATION_LEVELS: { emoji: string; label: string }[] = [
  { emoji: '😵', label: 'Asleep' },
  { emoji: '😨', label: 'Anxious' },
  { emoji: '😕', label: 'Unsure' },
  { emoji: '😬', label: 'Nervous' },
  { emoji: '😊', label: 'Friendly' },
  { emoji: '😃', label: 'Motivated' },
  { emoji: '🤗', label: 'Warm' },
  { emoji: '😎', label: 'Cool' },
  { emoji: '🤩', label: 'Pop Star' },
];
