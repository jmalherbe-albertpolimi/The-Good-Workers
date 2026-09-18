import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft, LogOut, RotateCcw, UserCheck, UserRound } from 'lucide-react';
import { useApp } from '../store/AppStore';
import { useAuth } from '../store/AuthStore';
import { Toggle } from '../components/Toggle';

export function SettingsScreen() {
  const navigate = useNavigate();
  const { state, dispatch, reset } = useApp();
  const { session, signOut } = useAuth();
  const { profile } = state;
  const demo = session?.demo ?? false;

  const confirmReset = () => {
    const question = demo
      ? 'Reset all demo data?'
      : 'Reset your missions and conversations? Your profile is kept.';
    if (window.confirm(question)) {
      reset();
      navigate('/proposals');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 bg-white px-3 pb-3 pt-[max(env(safe-area-inset-top),16px)]">
        <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="rounded-full p-2 active:bg-tile">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <ul className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <Row icon={<UserRound size={20} />} label="Account">
            <span className="max-w-[55%] truncate text-sm text-muted">{demo ? 'Demo profile' : session?.email}</span>
          </Row>
          <Row icon={<Bell size={20} />} label="Notifications">
            <Toggle checked={profile.notifications} onChange={(v) => dispatch({ type: 'UPDATE_PROFILE', patch: { notifications: v } })} label="Notifications" />
          </Row>
          <Row icon={<UserCheck size={20} />} label="Available for missions">
            <Toggle checked={profile.available} onChange={(v) => dispatch({ type: 'UPDATE_PROFILE', patch: { available: v } })} label="Availability" />
          </Row>
        </ul>

        <ul className="mt-4 overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <li>
            <button type="button" onClick={confirmReset} className="flex w-full items-center gap-3 px-4 py-4 text-left font-semibold active:bg-tile">
              <RotateCcw size={20} className="text-muted" /> {demo ? 'Reset demo data' : 'Reset my missions (demo)'}
            </button>
          </li>
          <li className="border-t border-black/5">
            <button type="button" onClick={signOut} className="flex w-full items-center gap-3 px-4 py-4 text-left font-semibold text-danger active:bg-tile">
              <LogOut size={20} /> Sign out
            </button>
          </li>
        </ul>

        <p className="mt-6 text-center text-xs text-muted">The Good Workers — demo v0.2 · accounts and data stored on this device only.</p>
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 border-b border-black/5 px-4 py-4 last:border-b-0">
      <span className="text-muted">{icon}</span>
      <span className="flex-1 font-semibold">{label}</span>
      {children}
    </li>
  );
}
