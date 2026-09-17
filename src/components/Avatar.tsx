import { useApp } from '../store/AppStore';

export function Avatar({ size = 48 }: { size?: number }) {
  const { state } = useApp();
  const { firstName, lastName } = state.profile;
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2fbfb9] to-[#1d8f8b] font-bold text-white ring-4 ring-white"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-label={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
