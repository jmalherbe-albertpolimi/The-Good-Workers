import { useState } from 'react';
import { ChevronDown, Heart, Search } from 'lucide-react';
import { CATEGORY_THEME, type Category } from '../data/types';
import { useApp, selectProposed } from '../store/AppStore';
import { Avatar } from '../components/Avatar';
import { MissionDetailsSheet } from '../components/MissionDetailsSheet';
import { SwipeCard, type Decision } from './propositions/SwipeCard';

export function PropositionsScreen() {
  const { state, dispatch } = useApp();
  const [favOnly, setFavOnly] = useState(false);
  const [catFilter, setCatFilter] = useState<Category | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const proposed = selectProposed(state);
  const visible = proposed.filter(
    (m) =>
      (!favOnly || state.profile.favoriteCategories.includes(m.category)) &&
      (!catFilter || m.category === catFilter),
  );
  const top = visible[0];
  const next = visible[1];
  const theme = CATEGORY_THEME[top?.category ?? 'Vente'];
  const categories = Array.from(new Set(proposed.map((m) => m.category)));

  const decide = (id: string, decision: Decision) => {
    dispatch({ type: decision === 'accept' ? 'ACCEPT' : 'REFUSE', id });
    setDetailsOpen(false);
  };

  const title =
    proposed.length === 0
      ? 'Aucune proposition'
      : proposed.length === 1
        ? 'Il y a 1 proposition'
        : `Il y a ${proposed.length} propositions`;

  return (
    <div className="flex h-full flex-col transition-colors duration-500" style={{ backgroundColor: theme.bg }}>
      <header className="flex items-center gap-4 px-5 pb-4 pt-[max(env(safe-area-inset-top),20px)]">
        <Avatar size={64} />
        <h1 className="flex-1 text-[26px] font-bold leading-tight">{title}</h1>
        <button
          type="button"
          role="switch"
          aria-checked={favOnly}
          aria-label="Afficher uniquement mes catégories favorites"
          onClick={() => setFavOnly((v) => !v)}
          className={`relative h-9 w-16 shrink-0 rounded-full transition-colors ${favOnly ? 'bg-teal' : 'bg-black/10'}`}
        >
          <span
            className={`absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow transition-transform ${
              favOnly ? 'translate-x-8' : 'translate-x-1'
            }`}
          >
            <Heart size={14} className={favOnly ? 'text-teal' : 'text-black/35'} fill="currentColor" />
          </span>
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-28">
        {top ? (
          <>
            <div className="relative mx-4">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-t-[22px] px-6 pb-7 pt-3 text-lg font-semibold"
                style={{ backgroundColor: theme.accent, color: theme.text }}
              >
                {catFilter ?? top.category}
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-current">
                  <ChevronDown size={18} strokeWidth={2.5} />
                </span>
              </button>
              {menuOpen && (
                <div className="absolute left-0 right-0 top-full z-30 rounded-2xl bg-white p-2 shadow-xl">
                  <MenuItem label="Toutes les catégories" count={proposed.length} active={!catFilter} onClick={() => { setCatFilter(null); setMenuOpen(false); }} />
                  {categories.map((c) => (
                    <MenuItem
                      key={c}
                      label={c}
                      count={proposed.filter((m) => m.category === c).length}
                      active={catFilter === c}
                      onClick={() => { setCatFilter(c); setMenuOpen(false); }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="relative z-20 -mt-4 min-h-0 flex-1">
              {next && (
                <div className="absolute inset-0 translate-y-2 scale-[0.96] rounded-[28px] bg-white/60 shadow-[0_6px_24px_rgba(0,0,0,0.08)]" />
              )}
              <SwipeCard
                key={top.id}
                mission={top}
                onDecide={(d) => decide(top.id, d)}
                onDetails={() => setDetailsOpen(true)}
              />
            </div>
          </>
        ) : (
          <EmptyPropositions filtered={proposed.length > 0} onClear={() => { setFavOnly(false); setCatFilter(null); }} />
        )}
      </div>

      <MissionDetailsSheet
        mission={top ?? null}
        open={detailsOpen && Boolean(top)}
        onClose={() => setDetailsOpen(false)}
        onDecide={top ? (d) => decide(top.id, d) : undefined}
      />
    </div>
  );
}

function MenuItem({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold ${active ? 'bg-tile' : ''}`}
    >
      {label}
      <span className="text-muted">{count}</span>
    </button>
  );
}

function EmptyPropositions({ filtered, onClear }: { filtered: boolean; onClear: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/70">
        <Search size={48} className="text-muted" />
      </div>
      <p className="mt-6 text-lg font-semibold">
        {filtered ? 'Aucune proposition ne correspond à ce filtre.' : 'Aucune proposition pour le moment.'}
      </p>
      <p className="mt-2 text-muted">
        {filtered ? 'Retire le filtre pour voir toutes les propositions.' : 'Reviens un peu plus tard, de nouvelles missions arrivent chaque jour.'}
      </p>
      {filtered && (
        <button type="button" onClick={onClear} className="mt-6 rounded-full bg-white px-6 py-3 font-semibold shadow">
          Voir toutes les propositions
        </button>
      )}
    </div>
  );
}
