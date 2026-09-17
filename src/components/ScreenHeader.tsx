import type { ReactNode } from 'react';
import { Avatar } from './Avatar';

export function ScreenHeader({ title, right }: { title: ReactNode; right?: ReactNode }) {
  return (
    <header className="flex items-center gap-4 bg-white px-5 pb-4 pt-[max(env(safe-area-inset-top),20px)]">
      <Avatar size={52} />
      <h1 className="flex-1 text-[26px] font-bold leading-tight">{title}</h1>
      {right}
    </header>
  );
}
