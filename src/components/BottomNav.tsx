import { NavLink } from 'react-router-dom';
import { MapPin, MessageCircle, User, Zap } from 'lucide-react';
import { useApp, selectProposed } from '../store/AppStore';

const tabs = [
  { to: '/proposals', label: 'Proposals', Icon: Zap },
  { to: '/missions', label: 'Missions', Icon: MapPin },
  { to: '/chat', label: 'Chat', Icon: MessageCircle },
  { to: '/profile', label: 'Profile', Icon: User },
];

export function BottomNav() {
  const { state } = useApp();
  const proposedCount = selectProposed(state).length;

  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-2">
      <div className="pointer-events-auto flex items-center justify-between rounded-full bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        {tabs.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[11px] font-semibold transition-colors ${
                isActive ? 'bg-tile text-ink' : 'text-ink/80'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className={isActive ? 'text-teal' : 'text-ink'}
                    fill={isActive ? 'rgba(35,181,176,0.18)' : 'none'}
                  />
                  {to === '/proposals' && proposedCount > 0 && (
                    <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-white">
                      {proposedCount}
                    </span>
                  )}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
