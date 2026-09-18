import type { Lang } from '../i18n/lang';

const WEEKDAYS: Record<Lang, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
};

const MONTHS: Record<Lang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
};

export function parseIsoDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatDate(iso: string, lang: Lang): string {
  const d = parseIsoDate(iso);
  const weekday = WEEKDAYS[lang][d.getDay()];
  const month = MONTHS[lang][d.getMonth()];
  return lang === 'fr'
    ? `${weekday} ${String(d.getDate()).padStart(2, '0')} ${month}`
    : `${weekday} ${month} ${d.getDate()}`;
}

export function formatHours(start: string, end: string): string {
  return `${start} - ${end}`;
}

const amount: Record<Lang, Intl.NumberFormat> = {
  en: new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  fr: new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

export function formatEuro(n: number, lang: Lang): string {
  const value = amount[lang].format(n);
  return lang === 'fr' ? `${value} €` : `€${value}`;
}

export interface SplitAmount {
  prefix: string;
  int: string;
  sep: string;
  dec: string;
  suffix: string;
}

export function splitEuro(n: number, lang: Lang): SplitAmount {
  const sep = lang === 'fr' ? ',' : '.';
  const [int, dec] = amount[lang].format(n).split(sep);
  return {
    prefix: lang === 'fr' ? '' : '€',
    int,
    sep,
    dec: dec ?? '00',
    suffix: lang === 'fr' ? ' €' : '',
  };
}

export function daysSince(iso: string): number {
  const ms = Date.now() - parseIsoDate(iso).getTime();
  return Math.floor(ms / 86_400_000);
}

export function formatTime(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatMessageDay(isoDateTime: string, lang: Lang): string {
  return formatDate(toIsoDate(new Date(isoDateTime)), lang);
}
