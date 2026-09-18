export type Lang = 'en' | 'fr';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export interface Localized {
  en: string;
  fr: string;
}

export function loc(value: string | Localized, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}
