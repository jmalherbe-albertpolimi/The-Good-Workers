import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { Message, Mission, Profile } from '../data/types';
import { formatDate } from '../lib/format';
import { readJson, writeJson } from './storage';

export interface AppState {
  missions: Mission[];
  messages: Message[];
  profile: Profile;
}

type Action =
  | { type: 'ACCEPT'; id: string }
  | { type: 'REFUSE'; id: string }
  | { type: 'COMPLETE'; id: string }
  | { type: 'CANCEL'; id: string }
  | { type: 'SEND_MESSAGE'; missionId: string; text: string }
  | { type: 'UPDATE_PROFILE'; patch: Partial<Profile> }
  | { type: 'RESET'; state: AppState };

function nowIso() {
  return new Date().toISOString();
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ACCEPT': {
      const mission = state.missions.find((m) => m.id === action.id);
      if (!mission) return state;
      // Démo : message d'accueil automatique — sera envoyé par l'équipe via le back office plus tard.
      const welcome: Message = {
        id: `msg_${Date.now()}`,
        missionId: mission.id,
        from: 'staff',
        author: mission.contact,
        at: nowIso(),
        text: `Bienvenue sur la mission ${mission.company.name} ! Rendez-vous le ${formatDate(mission.date)} à ${mission.startTime} — ${mission.address}. N'hésite pas si tu as la moindre question 😊`,
      };
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === action.id ? { ...m, status: 'accepted', acceptedAt: nowIso() } : m,
        ),
        messages: [...state.messages, welcome],
      };
    }
    case 'REFUSE':
      return {
        ...state,
        missions: state.missions.map((m) => (m.id === action.id ? { ...m, status: 'refused' } : m)),
      };
    case 'COMPLETE': {
      const mission = state.missions.find((m) => m.id === action.id);
      if (!mission || mission.status !== 'accepted') return state;
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === action.id ? { ...m, status: 'done', completedAt: nowIso() } : m,
        ),
        profile: { ...state.profile, balance: state.profile.balance + mission.price },
      };
    }
    case 'CANCEL':
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === action.id && m.status === 'accepted' ? { ...m, status: 'cancelled' } : m,
        ),
      };
    case 'SEND_MESSAGE': {
      const text = action.text.trim();
      if (!text) return state;
      const msg: Message = {
        id: `msg_${Date.now()}`,
        missionId: action.missionId,
        from: 'student',
        author: state.profile.firstName,
        at: nowIso(),
        text,
      };
      return { ...state, messages: [...state.messages, msg] };
    }
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.patch } };
    case 'RESET':
      return action.state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: (a: Action) => void;
  reset: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

interface ProviderProps {
  storageKey: string;
  fallback: () => AppState;
  resetState: (current: AppState) => AppState;
  children: ReactNode;
}

export function AppProvider({ storageKey, fallback, resetState, children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const saved = readJson<AppState>(storageKey);
    if (!saved) return fallback();
    // Les champs ajoutés depuis la sauvegarde prennent la valeur par défaut.
    const base = fallback();
    return { ...base, ...saved, profile: { ...base.profile, ...saved.profile } };
  });

  useEffect(() => {
    writeJson(storageKey, state);
  }, [storageKey, state]);

  const reset = () => dispatch({ type: 'RESET', state: resetState(state) });

  return <AppContext.Provider value={{ state, dispatch, reset }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export function selectProposed(state: AppState) {
  return state.missions.filter((m) => m.status === 'proposed');
}

export function selectCurrent(state: AppState) {
  return state.missions
    .filter((m) => m.status === 'accepted')
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function selectPast(state: AppState) {
  return state.missions
    .filter((m) => m.status === 'done' || m.status === 'cancelled')
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function selectStats(state: AppState) {
  const done = state.missions.filter((m) => m.status === 'done');
  const rated = done.filter((m) => typeof m.rating === 'number');
  const revenue = done.reduce((sum, m) => sum + m.price, 0);
  const avgRating = rated.length ? rated.reduce((s, m) => s + (m.rating ?? 0), 0) / rated.length : 0;
  return { doneCount: done.length, revenue, reviewCount: rated.length, avgRating };
}

export interface Conversation {
  mission: Mission;
  messages: Message[];
  last: Message;
}

const ACTIVE_WINDOW_DAYS = 30;

export function selectConversations(state: AppState): Conversation[] {
  const cutoff = Date.now() - ACTIVE_WINDOW_DAYS * 86_400_000;
  return state.missions
    .filter((m) => {
      if (m.status === 'accepted') return true;
      if (m.status === 'done' && m.completedAt) return new Date(m.completedAt).getTime() >= cutoff;
      return false;
    })
    .map((mission) => {
      const messages = state.messages
        .filter((msg) => msg.missionId === mission.id)
        .sort((a, b) => a.at.localeCompare(b.at));
      return { mission, messages, last: messages[messages.length - 1] };
    })
    .filter((c): c is Conversation => Boolean(c.last))
    .sort((a, b) => b.last.at.localeCompare(a.last.at));
}
