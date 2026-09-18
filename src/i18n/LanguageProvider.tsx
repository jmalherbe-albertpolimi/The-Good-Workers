import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dict, type TranslationKey } from './dict';
import type { Lang } from './lang';
import { LANG_KEY, readJson, writeJson } from '../store/storage';

export type Translate = (key: TranslationKey, vars?: Record<string, string | number>) => string;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translate;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLang(): Lang {
  const saved = readJson<Lang>(LANG_KEY);
  if (saved === 'en' || saved === 'fr') return saved;
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    writeJson(LANG_KEY, l);
  };

  const t: Translate = (key, vars) => {
    const template = dict[lang][key] ?? key;
    if (!vars) return template;
    return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), template);
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
