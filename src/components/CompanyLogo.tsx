import type { Company } from '../data/types';

export function CompanyLogo({ company, size = 64 }: { company: Company; size?: number }) {
  const long = company.logoText.length > 5;
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-center font-black leading-none tracking-tight ring-1 ring-black/5"
      style={{ width: size, height: size, color: company.color, fontSize: long ? size * 0.2 : size * 0.34 }}
      aria-label={company.name}
    >
      {company.logoText}
    </div>
  );
}
