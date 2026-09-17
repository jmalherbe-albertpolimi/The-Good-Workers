import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Mission, MissionStatus } from '../data/types';
import { useApp, selectCurrent, selectPast } from '../store/AppStore';
import { ScreenHeader } from '../components/ScreenHeader';
import { CompanyLogo } from '../components/CompanyLogo';
import { formatDate, formatEuro, formatHours } from '../lib/format';

export const STATUS_LABEL: Record<MissionStatus, { label: string; className: string }> = {
  proposed: { label: 'Proposée', className: 'bg-tile text-muted' },
  accepted: { label: 'Confirmée', className: 'bg-teal-light text-teal' },
  done: { label: 'Terminée', className: 'bg-tile text-muted' },
  cancelled: { label: 'Annulée', className: 'bg-red-50 text-danger' },
  refused: { label: 'Refusée', className: 'bg-tile text-muted' },
};

export function MissionsScreen() {
  const { state } = useApp();
  const [tab, setTab] = useState<'current' | 'past'>('current');
  const current = selectCurrent(state);
  const past = selectPast(state);
  const list = tab === 'current' ? current : past;

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Missions" />
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex justify-center gap-1 px-5 pt-5">
          <TabPill active={tab === 'current'} onClick={() => setTab('current')}>
            En cours ({current.length})
          </TabPill>
          <TabPill active={tab === 'past'} onClick={() => setTab('past')}>
            Passées ({past.length})
          </TabPill>
        </div>

        {list.length === 0 ? (
          <EmptyMissions past={tab === 'past'} />
        ) : (
          <ul className="mt-5 space-y-3 px-4">
            {list.map((m) => (
              <MissionRow key={m.id} mission={m} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TabPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-6 py-3 text-lg font-semibold transition-colors ${active ? 'bg-[#6b6b6b] text-white' : 'text-muted'}`}
    >
      {children}
    </button>
  );
}

function MissionRow({ mission }: { mission: Mission }) {
  const status = STATUS_LABEL[mission.status];
  return (
    <li>
      <Link to={`/missions/${mission.id}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] active:bg-tile">
        <CompanyLogo company={mission.company} size={56} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-lg font-bold">{mission.company.name}</div>
          <div className="truncate text-[13px] text-muted">
            {mission.city} • {formatDate(mission.date)} • {formatHours(mission.startTime, mission.endTime)}
          </div>
          <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${status.className}`}>{status.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="tnum font-bold">{formatEuro(mission.price)}</span>
          <ChevronRight size={20} className="text-muted" />
        </div>
      </Link>
    </li>
  );
}

function EmptyMissions({ past }: { past: boolean }) {
  return (
    <div className="flex flex-col items-center px-8 pt-24 text-center">
      <div className="relative flex h-64 w-64 items-center justify-center">
        {[-90, -30, 30, 90].map((offset) => (
          <span
            key={offset}
            className="absolute h-4 w-40 rotate-45 rounded-full bg-black/[0.06]"
            style={{ transform: `translate(${offset}px, ${-offset * 0.4}px) rotate(45deg)` }}
          />
        ))}
        <span className="relative text-[150px] leading-none">😴</span>
      </div>
      <p className="mt-6 text-lg font-semibold leading-snug">
        {past
          ? "Aucune mission passée pour l'instant."
          : "Aucune mission pour le moment. Pour rejoindre une mission, rends-toi dans l'onglet des propositions."}
      </p>
      {!past && (
        <Link to="/propositions" className="mt-14 text-xl font-semibold underline underline-offset-4">
          ⚡ Voir les propositions
        </Link>
      )}
    </div>
  );
}
