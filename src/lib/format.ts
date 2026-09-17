const WEEKDAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

export function parseIsoDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatDate(iso: string): string {
  const d = parseIsoDate(iso);
  return `${WEEKDAYS[d.getDay()]} ${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]}`;
}

export function formatHours(start: string, end: string): string {
  return `${start} - ${end}`;
}

const euro = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatEuro(n: number): string {
  return `${euro.format(n)} €`;
}

export function splitEuro(n: number): { int: string; dec: string } {
  const [int, dec] = euro.format(n).split(',');
  return { int, dec: dec ?? '00' };
}

export function daysSince(iso: string): number {
  const ms = Date.now() - parseIsoDate(iso).getTime();
  return Math.floor(ms / 86_400_000);
}

export function formatTime(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatMessageDay(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  return formatDate(toIsoDate(d));
}
