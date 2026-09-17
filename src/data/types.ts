export type Category =
  | 'Vente'
  | 'Logistique'
  | 'Événementiel'
  | 'Restauration'
  | 'Inventaire'
  | 'Accueil';

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
  studentsCount: number;
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
  from: 'staff' | 'student';
  author: string;
  text: string;
  at: string;
}

export type StudyLevel = 'Bac' | 'Bac+1' | 'Bac+2' | 'Bac+3' | 'Bac+4' | 'Bac+5' | 'Doctorat' | 'Autre';

export const STUDY_LEVELS: StudyLevel[] = ['Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5', 'Doctorat', 'Autre'];

export const ALL_CATEGORIES: Category[] = ['Vente', 'Logistique', 'Événementiel', 'Restauration', 'Inventaire', 'Accueil'];

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
  Vente: { accent: '#f0507c', bg: '#fde3ea', text: '#ffffff' },
  Logistique: { accent: '#3b82f6', bg: '#e0ebff', text: '#ffffff' },
  Événementiel: { accent: '#8b5cf6', bg: '#ece5ff', text: '#ffffff' },
  Restauration: { accent: '#f97316', bg: '#ffe8d6', text: '#ffffff' },
  Inventaire: { accent: '#23b5b0', bg: '#dcf4f2', text: '#ffffff' },
  Accueil: { accent: '#f7c948', bg: '#fff3cc', text: '#1f1f1f' },
};

export const ALL_REGIONS = [
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Occitanie',
  'Nouvelle-Aquitaine',
  'Hauts-de-France',
  'Provence-Alpes-Côte d\'Azur',
  'Grand Est',
  'Pays de la Loire',
  'Bretagne',
];

export const MOTIVATION_LEVELS: { emoji: string; label: string }[] = [
  { emoji: '😵', label: 'Endormi' },
  { emoji: '😨', label: 'Frileux' },
  { emoji: '😕', label: 'Hésitant' },
  { emoji: '😬', label: 'Timide' },
  { emoji: '😊', label: 'Sympa' },
  { emoji: '😃', label: 'Motivé' },
  { emoji: '🤗', label: 'Chaleureux' },
  { emoji: '😎', label: 'Cool' },
  { emoji: '🤩', label: 'Pop Star' },
];
