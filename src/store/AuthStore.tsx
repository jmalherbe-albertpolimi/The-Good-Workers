// DEMO AUTH — accounts stored in the browser. To be replaced by Supabase Auth with the back office.
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Profile } from '../data/types';
import { newUserState } from '../data/mockData';
import { ACCOUNTS_KEY, SESSION_KEY, readJson, removeKey, stateKeyFor, writeJson } from './storage';

export interface Session {
  email: string;
  demo: boolean;
}

interface Account {
  email: string;
  passwordHash: string;
  createdAt: string;
}

type Accounts = Record<string, Account>;

export type AuthResult = { ok: true } | { ok: false; error: string };

interface AuthContextValue {
  session: Session | null;
  emailExists: (email: string) => boolean;
  signUp: (email: string, password: string, profile: Profile) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
  enterDemo: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const normalize = (email: string) => email.trim().toLowerCase();

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function loadAccounts(): Accounts {
  return readJson<Accounts>(ACCOUNTS_KEY) ?? {};
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => readJson<Session>(SESSION_KEY));

  const persistSession = (s: Session | null) => {
    setSession(s);
    if (s) writeJson(SESSION_KEY, s);
    else removeKey(SESSION_KEY);
  };

  const value: AuthContextValue = {
    session,
    emailExists: (email) => Boolean(loadAccounts()[normalize(email)]),
    signUp: async (email, password, profile) => {
      const key = normalize(email);
      const accounts = loadAccounts();
      if (accounts[key]) return { ok: false, error: 'An account already exists with this email.' };
      accounts[key] = { email: key, passwordHash: await sha256(password), createdAt: new Date().toISOString() };
      writeJson(ACCOUNTS_KEY, accounts);
      writeJson(stateKeyFor(key), newUserState({ ...profile, email: key }));
      persistSession({ email: key, demo: false });
      return { ok: true };
    },
    signIn: async (email, password) => {
      const key = normalize(email);
      const account = loadAccounts()[key];
      if (!account || account.passwordHash !== (await sha256(password))) {
        return { ok: false, error: 'Incorrect email or password.' };
      }
      persistSession({ email: key, demo: false });
      return { ok: true };
    },
    signOut: () => persistSession(null),
    enterDemo: () => persistSession({ email: 'demo', demo: true }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
