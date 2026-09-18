// Bump the version when the stored shape changes: old saves are dropped instead of crashing the app.
export const DEMO_STATE_KEY = 'tgw_demo_v3';
export const ACCOUNTS_KEY = 'tgw_accounts_v3';
export const SESSION_KEY = 'tgw_session_v3';
export const LANG_KEY = 'tgw_lang_v1';

export function stateKeyFor(email: string) {
  return `tgw_state_v3_${email.toLowerCase()}`;
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
    // storage unavailable: the app keeps running in memory
  }
}

export function removeKey(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
