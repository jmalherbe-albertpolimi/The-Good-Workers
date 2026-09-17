import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Calendar, Check, ChevronLeft, Clock, MapPin, MessageCircle, Shirt, UserRound, Users } from 'lucide-react';
import { CATEGORY_THEME } from '../data/types';
import { useApp } from '../store/AppStore';
import { CompanyLogo } from '../components/CompanyLogo';
import { Stars } from '../components/Stars';
import { STATUS_LABEL } from './MissionsScreen';
import { formatDate, formatEuro, formatHours, toIsoDate } from '../lib/format';

export function MissionDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const mission = state.missions.find((m) => m.id === id);
  if (!mission) return <Navigate to="/missions" replace />;

  const theme = CATEGORY_THEME[mission.category];
  const status = STATUS_LABEL[mission.status];
  const today = toIsoDate(new Date());
  const dayReached = mission.date <= today;
  const missionEnded = dayReached && (mission.date < today || mission.endTime <= new Date().toTimeString().slice(0, 5));

  const complete = () => {
    dispatch({ type: 'COMPLETE', id: mission.id });
  };
  const cancel = () => {
    if (window.confirm('Annuler ta participation à cette mission ?')) {
      dispatch({ type: 'CANCEL', id: mission.id });
      navigate('/missions');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 bg-white px-3 pb-3 pt-[max(env(safe-area-inset-top),16px)]">
        <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="rounded-full p-2 active:bg-tile">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold">Mission</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-10">
        <div className="px-5 pb-6 pt-5" style={{ backgroundColor: theme.bg }}>
          <div className="flex items-center gap-4">
            <CompanyLogo company={mission.company} size={72} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xl font-bold">{mission.company.name}</div>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="rounded-full px-3 py-0.5 text-sm font-semibold" style={{ backgroundColor: theme.accent, color: theme.text }}>
                  {mission.category}
                </span>
                <span className={`rounded-full px-3 py-0.5 text-sm font-bold ${status.className}`}>{status.label}</span>
              </div>
            </div>
          </div>
          <div className="tnum mt-4 text-[44px] font-black leading-none">{formatEuro(mission.price)}</div>
        </div>

        <ul className="grid grid-cols-2 gap-3 px-4 pt-4">
          <Info icon={<Calendar size={18} />} label="Date" value={formatDate(mission.date)} />
          <Info icon={<Clock size={18} />} label="Heures" value={formatHours(mission.startTime, mission.endTime)} />
          <Info icon={<MapPin size={18} />} label="Lieu" value={mission.city} />
          <Info icon={<Users size={18} />} label="Students" value={String(mission.studentsCount)} />
        </ul>

        <div className="space-y-5 px-5 pt-5">
          <Block title="La mission">{mission.description}</Block>
          <Block title="Adresse">{mission.address}</Block>
          {mission.dressCode && <Block title="Dress code" icon={<Shirt size={14} />}>{mission.dressCode}</Block>}
          <Block title="Ton contact" icon={<UserRound size={14} />}>{mission.contact}</Block>
        </div>

        {mission.status === 'accepted' && (
          <div className="px-4 pt-6">
            <ol className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <Step done label="Mission acceptée" hint={mission.acceptedAt ? `le ${formatDate(toIsoDate(new Date(mission.acceptedAt)))}` : undefined} />
              <Step done={dayReached} label="Jour J" hint={`${formatDate(mission.date)} • ${formatHours(mission.startTime, mission.endTime)}`} />
              <Step done={false} label="C'est terminé" hint="À valider à la fin de la mission" last />
            </ol>

            <button
              type="button"
              onClick={() => navigate(`/chat/${mission.id}`)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-lg font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.04)] active:bg-tile"
            >
              <MessageCircle size={20} /> Ouvrir la conversation
            </button>
            <button
              type="button"
              onClick={complete}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-teal py-4 text-lg font-semibold text-white active:opacity-90"
            >
              <Check size={22} strokeWidth={3} /> C'est terminé
            </button>
            {!missionEnded && (
              <p className="mt-2 text-center text-xs text-muted">
                Démo : en production ce bouton ne s'active qu'à la fin de la mission.
              </p>
            )}
            <button type="button" onClick={cancel} className="mt-4 w-full py-3 font-semibold text-danger">
              Annuler ma participation
            </button>
          </div>
        )}

        {mission.status === 'done' && (
          <div className="mx-4 mt-6 rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <div className="text-xs font-bold uppercase tracking-wide text-muted">Mission terminée</div>
            <div className="mt-1 font-semibold">
              Gains : <span className="tnum">{formatEuro(mission.price)}</span>
            </div>
            <div className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">Avis client</div>
            {typeof mission.rating === 'number' ? (
              <div className="mt-1 flex items-center gap-3">
                <span className="text-3xl font-black text-muted">{mission.rating}</span>
                <Stars value={mission.rating} size={22} />
              </div>
            ) : (
              <p className="mt-1 text-muted">En attente de l'avis du client.</p>
            )}
          </div>
        )}

        {mission.status === 'cancelled' && (
          <div className="mx-4 mt-6 rounded-2xl bg-red-50 p-5 text-danger">
            <div className="font-bold">Mission annulée</div>
            <p className="mt-1 text-sm">{mission.description}</p>
          </div>
        )}

        {mission.status === 'proposed' && (
          <div className="mt-6 flex gap-3 px-4">
            <button type="button" onClick={() => { dispatch({ type: 'REFUSE', id: mission.id }); navigate('/propositions'); }} className="flex-1 rounded-full bg-tile py-4 text-lg font-semibold text-danger">
              Refuser
            </button>
            <button type="button" onClick={() => { dispatch({ type: 'ACCEPT', id: mission.id }); navigate('/missions'); }} className="flex-1 rounded-full bg-teal py-4 text-lg font-semibold text-white">
              Accepter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <span className="text-muted">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
        <div className="truncate font-semibold">{value}</div>
      </div>
    </li>
  );
}

function Block({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
        {icon}
        {title}
      </h3>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

function Step({ done, label, hint, last }: { done: boolean; label: string; hint?: string; last?: boolean }) {
  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className={`flex h-7 w-7 items-center justify-center rounded-full ${done ? 'bg-teal text-white' : 'border-2 border-black/15 bg-white'}`}>
          {done && <Check size={16} strokeWidth={3} />}
        </span>
        {!last && <span className={`my-1 w-0.5 flex-1 ${done ? 'bg-teal' : 'bg-black/10'}`} />}
      </div>
      <div className={last ? 'pb-0' : 'pb-5'}>
        <div className="font-semibold">{label}</div>
        {hint && <div className="text-sm text-muted">{hint}</div>}
      </div>
    </li>
  );
}
