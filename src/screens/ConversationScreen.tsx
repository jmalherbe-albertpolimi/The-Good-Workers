import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Info, Send } from 'lucide-react';
import { useApp } from '../store/AppStore';
import { CompanyLogo } from '../components/CompanyLogo';
import { BrandIcon } from '../components/BrandIcon';
import { formatDate, formatHours, formatMessageDay, formatTime } from '../lib/format';

export function ConversationScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const mission = state.missions.find((m) => m.id === id);
  const messages = state.messages.filter((m) => m.missionId === id).sort((a, b) => a.at.localeCompare(b.at));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  if (!mission) return <Navigate to="/chat" replace />;

  const send = () => {
    if (!draft.trim()) return;
    dispatch({ type: 'SEND_MESSAGE', missionId: mission.id, text: draft });
    setDraft('');
  };

  let lastDay = '';

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 bg-white px-3 pb-3 pt-[max(env(safe-area-inset-top),16px)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="rounded-full p-2 active:bg-tile">
          <ChevronLeft size={28} />
        </button>
        <CompanyLogo company={mission.company} size={44} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-lg font-bold leading-tight">{mission.company.name}</div>
          <div className="truncate text-sm text-muted">
            {mission.city} • {formatDate(mission.date)} • {formatHours(mission.startTime, mission.endTime)}
          </div>
        </div>
        <button type="button" onClick={() => navigate(`/missions/${mission.id}`)} aria-label="Mission details" className="rounded-full p-2 active:bg-tile">
          <Info size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((m) => {
          const day = formatMessageDay(m.at);
          const showDay = day !== lastDay;
          lastDay = day;
          const mine = m.from === 'worker';
          return (
            <div key={m.id}>
              {showDay && <div className="my-3 text-center text-xs font-semibold uppercase tracking-wide text-muted">{day}</div>}
              <div className={`mb-2 flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
                {!mine && <BrandIcon size={28} className="mb-1" />}
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${mine ? 'rounded-br-md bg-teal text-white' : 'rounded-bl-md bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]'}`}>
                  {!mine && <div className="mb-0.5 text-xs font-bold text-teal">{m.author}</div>}
                  <p className="whitespace-pre-wrap leading-snug">{m.text}</p>
                  <div className={`mt-1 text-right text-[11px] ${mine ? 'text-white/80' : 'text-muted'}`}>{formatTime(m.at)}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 bg-white px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write your message…"
          className="min-w-0 flex-1 rounded-full bg-tile px-5 py-3 outline-none placeholder:text-muted focus:ring-2 focus:ring-teal/40"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-white disabled:opacity-40"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
