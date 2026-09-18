import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp, selectConversations } from '../store/AppStore';
import { ScreenHeader } from '../components/ScreenHeader';
import { CompanyLogo } from '../components/CompanyLogo';
import { formatDate, formatHours } from '../lib/format';

export function ChatScreen() {
  const { state } = useApp();
  const conversations = selectConversations(state);
  const n = conversations.length;

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Chat" />
      <div className="flex-1 overflow-y-auto pb-32">
        <h2 className="px-4 pb-4 pt-6 text-[26px] font-bold">
          {n === 0 ? 'No active conversations' : n === 1 ? '1 active conversation' : `${n} active conversations`}
        </h2>

        {n === 0 ? (
          <p className="px-8 pt-10 text-center text-muted">
            A conversation opens automatically as soon as you accept a mission.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {conversations.map(({ mission, last }) => (
              <li key={mission.id}>
                <Link to={`/chat/${mission.id}`} className="block bg-white px-4 py-4 active:bg-tile">
                  <div className="flex items-center gap-3">
                    <CompanyLogo company={mission.company} size={60} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[22px] font-bold leading-tight">{mission.company.name}</div>
                      <div className="truncate text-[15px] text-muted">
                        {mission.city} • {formatDate(mission.date)} • {formatHours(mission.startTime, mission.endTime)}
                      </div>
                    </div>
                    <ChevronRight size={22} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-[17px] leading-snug">
                    <span className="font-bold">{last.from === 'worker' ? 'You' : last.author}: </span>
                    {last.text}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
