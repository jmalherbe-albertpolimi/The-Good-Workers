import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Compass, LifeBuoy, Pencil, Settings } from 'lucide-react';
import { ALL_REGIONS, MOTIVATION_LEVELS } from '../data/types';
import { useApp, selectStats } from '../store/AppStore';
import { Avatar } from '../components/Avatar';
import { BottomSheet } from '../components/BottomSheet';
import { Stars } from '../components/Stars';
import { Toggle } from '../components/Toggle';
import { daysSince, formatEuro, splitEuro } from '../lib/format';

type Sheet = 'regions' | 'infos' | 'aide' | 'solde' | null;

export function ProfileScreen() {
  const { state, dispatch } = useApp();
  const { profile } = state;
  const stats = selectStats(state);
  const [sheet, setSheet] = useState<Sheet>(null);

  const balance = splitEuro(profile.balance);
  const days = daysSince(profile.memberSince);
  const motivation = MOTIVATION_LEVELS[Math.min(profile.motivationLevel, MOTIVATION_LEVELS.length - 1)];
  const motivationPct = ((profile.motivationLevel + 1) / MOTIVATION_LEVELS.length) * 100;

  return (
    <div className="h-full overflow-y-auto pb-32">
      <div className="relative h-[220px] rounded-b-[44px] bg-teal">
        <HeaderArt />
        <button
          type="button"
          onClick={() => setSheet('regions')}
          className="absolute right-4 top-[max(env(safe-area-inset-top),20px)] flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2 pr-3 text-lg font-semibold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
            <Compass size={18} />
          </span>
          {profile.regions.length} {profile.regions.length > 1 ? 'régions' : 'région'}
          <ChevronRight size={20} />
        </button>
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <Avatar size={116} />
        </div>
      </div>

      <div className="mt-[72px] text-center">
        <h1 className="text-[26px] font-bold">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="tnum mt-0.5 font-semibold tracking-wide text-muted">
          {profile.siret ? `SIRET : ${profile.siret}` : 'Statut auto-entrepreneur à créer'}
        </p>
        {profile.validationStatus === 'pending' && (
          <span className="mt-2 inline-block rounded-full bg-star/30 px-3 py-1 text-sm font-semibold text-[#8a6300]">
            Profil en cours de validation
          </span>
        )}
      </div>

      <div className="mt-5 flex justify-center gap-2 px-4">
        <button type="button" onClick={() => setSheet('infos')} className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-tile px-4 py-3 text-[15px] font-semibold active:bg-black/10">
          <Pencil size={16} /> Compléter mes infos
        </button>
        <button type="button" onClick={() => setSheet('aide')} className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-tile px-4 py-3 text-[15px] font-semibold active:bg-black/10">
          <LifeBuoy size={18} /> Aide
        </button>
        <Link to="/parametres" aria-label="Paramètres" className="flex items-center rounded-2xl bg-tile px-3 py-3 active:bg-black/10">
          <Settings size={22} />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setSheet('solde')}
        className="mx-4 mt-8 flex w-[calc(100%-2rem)] items-center justify-between rounded-2xl bg-navy p-5 text-left text-white active:opacity-90"
      >
        <div>
          <div className="tnum leading-none">
            <span className="text-[44px] font-black">{balance.int}</span>
            <span className="text-[26px] font-semibold">,{balance.dec} €</span>
          </div>
          <div className="mt-1 text-lg">Mon solde</div>
        </div>
        <div className="flex items-center gap-3">
          {profile.balance === 0 && <span className="text-5xl">💤</span>}
          <ChevronRight size={22} />
        </div>
      </button>

      <h2 className="mt-8 px-5 text-[28px] font-black uppercase tracking-wide text-black/15">Tableau de bord</h2>

      <div className="mt-3 space-y-3 px-4">
        <div className="rounded-2xl bg-tile p-5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold uppercase tracking-wide text-muted">Score de motivation</span>
            <span className="text-lg font-semibold text-muted">{motivation.label}</span>
          </div>
          <div className="mt-3 flex justify-between text-[30px] leading-none">
            {MOTIVATION_LEVELS.map((lvl, i) => (
              <span key={lvl.label} className={i <= profile.motivationLevel ? '' : 'opacity-40 grayscale'}>
                {lvl.emoji}
              </span>
            ))}
          </div>
          <div className="mt-4 h-3 rounded-full bg-black/5">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-light to-teal" style={{ width: `${motivationPct}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Tile label="Missions réalisées" value={String(stats.doneCount)} />
          <Tile label="Chiffre d'affaires 💸" value={formatEuro(stats.revenue)} />
        </div>

        <div className="rounded-2xl bg-tile p-5">
          <div className="text-lg font-bold uppercase tracking-wide text-muted">
            {stats.reviewCount} avis client{stats.reviewCount > 1 ? 's' : ''}
          </div>
          {stats.reviewCount > 0 ? (
            <div className="mt-1 flex items-center gap-5">
              <span className="tnum text-[44px] font-black leading-none text-muted">{stats.avgRating.toFixed(1).replace('.', ',')}</span>
              <Stars value={stats.avgRating} size={40} />
            </div>
          ) : (
            <p className="mt-1 text-muted">Pas encore d'avis.</p>
          )}
        </div>
      </div>

      <p className="mt-7 px-8 text-center text-[17px] font-semibold leading-snug text-muted">
        {days < 1
          ? 'Bienvenue ! Tu viens de rejoindre notre grande famille de Students.'
          : `Depuis maintenant ${days} jour${days > 1 ? 's' : ''} tu fais partie de notre grande famille de Students.`}
      </p>

      <div className="mt-6 flex items-center justify-center gap-6">
        <span className={`text-xl ${profile.available ? 'text-muted/60' : 'font-bold'}`}>Non dispo</span>
        <Toggle checked={profile.available} onChange={(v) => dispatch({ type: 'UPDATE_PROFILE', patch: { available: v } })} label="Disponibilité" />
        <span className={`text-xl ${profile.available ? 'font-bold' : 'text-muted/60'}`}>Disponible</span>
      </div>

      <BottomSheet open={sheet === 'regions'} onClose={() => setSheet(null)} title="Mes régions">
        <p className="mb-4 text-muted">Tu reçois les propositions des régions sélectionnées.</p>
        <ul className="space-y-1">
          {ALL_REGIONS.map((r) => {
            const on = profile.regions.includes(r);
            return (
              <li key={r}>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_PROFILE',
                      patch: { regions: on ? profile.regions.filter((x) => x !== r) : [...profile.regions, r] },
                    })
                  }
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-semibold active:bg-tile"
                >
                  {r}
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${on ? 'border-teal bg-teal text-white' : 'border-black/20'}`}>
                    {on && '✓'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </BottomSheet>

      <BottomSheet open={sheet === 'infos'} onClose={() => setSheet(null)} title="Mes infos">
        <InfosForm onDone={() => setSheet(null)} />
      </BottomSheet>

      <BottomSheet open={sheet === 'aide'} onClose={() => setSheet(null)} title="Aide">
        <div className="space-y-4">
          <Faq q="Comment accepter une mission ?">
            Dans l'onglet Propositions, glisse la carte vers la droite ou appuie sur ✓. La mission apparaît ensuite dans « Missions » et une conversation s'ouvre avec ton contact.
          </Faq>
          <Faq q="Quand suis-je payé ?">
            Après validation de l'étape « C'est terminé », le montant est ajouté à ton solde. Le virement est déclenché par l'équipe StudentPop.
          </Faq>
          <Faq q="Je ne peux plus venir, que faire ?">
            Ouvre la mission puis « Annuler ma participation », et préviens ton contact dans le chat le plus tôt possible.
          </Faq>
          <p className="pt-2 text-sm text-muted">Besoin d'autre chose ? Écris-nous dans le chat de ta mission.</p>
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === 'solde'} onClose={() => setSheet(null)} title="Mon solde">
        <div className="rounded-2xl bg-navy p-5 text-white">
          <div className="text-sm uppercase tracking-wide text-white/70">Disponible</div>
          <div className="tnum text-[40px] font-black leading-none">{formatEuro(profile.balance)}</div>
        </div>
        <dl className="mt-5 space-y-3">
          <div className="flex justify-between">
            <dt className="text-muted">Total gagné</dt>
            <dd className="tnum font-semibold">{formatEuro(stats.revenue)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Déjà versé</dt>
            <dd className="tnum font-semibold">{formatEuro(stats.revenue - profile.balance)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-muted">
          Les virements sont déclenchés par l'équipe StudentPop après chaque mission validée.
        </p>
      </BottomSheet>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-tile p-5">
      <div className="text-lg font-bold uppercase leading-tight tracking-wide text-muted">{label}</div>
      <div className="tnum mt-2 text-[40px] font-black leading-none text-muted">{value}</div>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold">{q}</h3>
      <p className="mt-1 text-[15px] leading-relaxed text-ink/80">{children}</p>
    </div>
  );
}

function InfosForm({ onDone }: { onDone: () => void }) {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState({
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    phone: state.profile.phone,
    email: state.profile.email,
  });
  const field = (key: keyof typeof form, label: string, type = 'text') => (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-1 w-full rounded-xl bg-tile px-4 py-3 outline-none focus:ring-2 focus:ring-teal/40"
      />
    </label>
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_PROFILE', patch: form });
        onDone();
      }}
      className="space-y-3"
    >
      <div className="grid grid-cols-2 gap-3">
        {field('firstName', 'Prénom')}
        {field('lastName', 'Nom')}
      </div>
      {field('phone', 'Téléphone', 'tel')}
      {field('email', 'Email', 'email')}
      <button type="submit" className="mt-2 w-full rounded-full bg-teal py-4 text-lg font-semibold text-white">
        Enregistrer
      </button>
    </form>
  );
}

function HeaderArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 220" fill="none" aria-hidden="true">
      <circle cx="60" cy="150" r="70" fill="#ffffff" fillOpacity="0.12" />
      <circle cx="380" cy="60" r="90" fill="#ffffff" fillOpacity="0.1" />
      <rect x="300" y="120" width="80" height="80" rx="24" fill="#f7c948" fillOpacity="0.9" transform="rotate(-12 340 160)" />
      <rect x="20" y="30" width="60" height="60" rx="18" fill="#f0507c" fillOpacity="0.85" transform="rotate(14 50 60)" />
      <circle cx="120" cy="70" r="14" fill="#14143c" fillOpacity="0.9" />
      <circle cx="330" cy="200" r="10" fill="#ffffff" fillOpacity="0.8" />
    </svg>
  );
}
