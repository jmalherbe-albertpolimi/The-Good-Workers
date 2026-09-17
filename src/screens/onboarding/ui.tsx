import type { ReactNode } from 'react';

export const inputClass =
  'mt-1.5 w-full rounded-xl bg-white px-4 py-3.5 text-[16px] outline-none ring-1 ring-black/5 placeholder:text-muted/70 focus:ring-2 focus:ring-teal/50';

export function StepTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[28px] font-black leading-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors ${
        active ? 'bg-teal text-white' : 'bg-white text-ink ring-1 ring-black/10'
      }`}
    >
      {children}
    </button>
  );
}

export function OptionCard({
  active,
  onClick,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full rounded-2xl p-4 text-left transition-colors ${
        active ? 'bg-teal text-white' : 'bg-white ring-1 ring-black/10'
      }`}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className={`mt-0.5 text-sm ${active ? 'text-white/85' : 'text-muted'}`}>{description}</div>
    </button>
  );
}
