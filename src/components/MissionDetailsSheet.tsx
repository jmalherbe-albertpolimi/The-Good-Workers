import { Calendar, Clock, MapPin, Shirt, UserRound, Users } from 'lucide-react';
import { CATEGORY_THEME, type Mission } from '../data/types';
import { BottomSheet } from './BottomSheet';
import { CompanyLogo } from './CompanyLogo';
import { formatDate, formatEuro, formatHours } from '../lib/format';

interface Props {
  mission: Mission | null;
  open: boolean;
  onClose: () => void;
  onDecide?: (d: 'accept' | 'refuse') => void;
}

export function MissionDetailsSheet({ mission, open, onClose, onDecide }: Props) {
  if (!mission) return null;
  const theme = CATEGORY_THEME[mission.category];

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex items-center gap-4">
        <CompanyLogo company={mission.company} size={64} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-xl font-bold">{mission.company.name}</div>
          <span
            className="mt-1 inline-block rounded-full px-3 py-0.5 text-sm font-semibold"
            style={{ backgroundColor: theme.accent, color: theme.text }}
          >
            {mission.category}
          </span>
        </div>
        <div className="tnum text-2xl font-black">{formatEuro(mission.price)}</div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 text-[15px]">
        <InfoItem icon={<Calendar size={18} />} label="Date" value={formatDate(mission.date)} />
        <InfoItem icon={<Clock size={18} />} label="Heures" value={formatHours(mission.startTime, mission.endTime)} />
        <InfoItem icon={<MapPin size={18} />} label="Lieu" value={mission.city} />
        <InfoItem icon={<Users size={18} />} label="Students" value={String(mission.studentsCount)} />
      </ul>

      <Section title="La mission">{mission.description}</Section>
      <Section title="Adresse">{mission.address}</Section>
      {mission.dressCode && (
        <Section title="Dress code" icon={<Shirt size={16} />}>
          {mission.dressCode}
        </Section>
      )}
      <Section title="Ton contact" icon={<UserRound size={16} />}>
        {mission.contact}
      </Section>

      {onDecide && (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => onDecide('refuse')}
            className="flex-1 rounded-full bg-tile py-4 text-lg font-semibold text-danger active:bg-black/10"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => onDecide('accept')}
            className="flex-1 rounded-full bg-teal py-4 text-lg font-semibold text-white active:opacity-90"
          >
            Accepter
          </button>
        </div>
      )}
    </BottomSheet>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-tile px-4 py-3">
      <span className="text-muted">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
        <div className="truncate font-semibold">{value}</div>
      </div>
    </li>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
        {icon}
        {title}
      </h3>
      <p className="text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}
