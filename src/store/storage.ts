export const DEMO_STATE_KEY = 'tgw_demo_v1';
export const ACCOUNTS_KEY = 'tgw_accounts_v1';
export const SESSION_KEY = 'tgw_session_v1';

export function stateKeyFor(email: string) {
  return `tgw_state_${email.toLowerCase()}`;
}

export function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stockage indisponible : l'app continue en mémoire
  }
}

export function removeKey(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
