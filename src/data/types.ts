import type { TranslationKey } from '../i18n/dict';
import type { Localized } from '../i18n/lang';

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
  city: Localized;
  address: string;
  workersCount: number;
  description: Localized;
  dressCode: Localized | '';
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
  text: string | Localized;
  at: string;
}

export type StudyLevel = 'highschool' | 'year1' | 'year2' | 'year3' | 'year4' | 'year5' | 'phd' | 'other';

export const STUDY_LEVELS: StudyLevel[] = ['highschool', 'year1', 'year2', 'year3', 'year4', 'year5', 'phd', 'other'];

export const studyLevelKey = (level: StudyLevel): TranslationKey => `level.${level}` as TranslationKey;

export const ALL_CATEGORIES: Category[] = ['Retail', 'Logistics', 'Events', 'Catering', 'Inventory', 'Reception'];

export const categoryKey = (category: Category): TranslationKey => `category.${category}` as TranslationKey;

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

// Region names are stored in French (they are proper nouns); only the ones that differ get translated.
export const ALL_REGIONS = [
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Occitanie',
  'Nouvelle-Aquitaine',
  'Hauts-de-France',
  "Provence-Alpes-Côte d'Azur",
  'Grand Est',
  'Pays de la Loire',
  'Bretagne',
];

const TRANSLATED_REGIONS = new Set(['Bretagne']);

export function regionKey(region: string): TranslationKey | null {
  return TRANSLATED_REGIONS.has(region) ? (`region.${region}` as TranslationKey) : null;
}

export const MOTIVATION_LEVELS: { emoji: string; key: TranslationKey }[] = [
  { emoji: '😵', key: 'motivation.asleep' },
  { emoji: '😨', key: 'motivation.anxious' },
  { emoji: '😕', key: 'motivation.unsure' },
  { emoji: '😬', key: 'motivation.nervous' },
  { emoji: '😊', key: 'motivation.friendly' },
  { emoji: '😃', key: 'motivation.motivated' },
  { emoji: '🤗', key: 'motivation.warm' },
  { emoji: '😎', key: 'motivation.cool' },
  { emoji: '🤩', key: 'motivation.popstar' },
];
