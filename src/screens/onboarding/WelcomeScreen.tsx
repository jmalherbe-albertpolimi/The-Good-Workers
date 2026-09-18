import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthStore';
import { BrandIcon } from '../../components/BrandIcon';

export function WelcomeScreen() {
  const { enterDemo } = useAuth();

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-teal px-6 pb-[max(env(safe-area-inset-bottom),24px)] pt-[max(env(safe-area-inset-top),24px)] text-white">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 430 900" fill="none" aria-hidden="true">
        <circle cx="380" cy="120" r="140" fill="#ffffff" fillOpacity="0.1" />
        <circle cx="40" cy="720" r="120" fill="#ffffff" fillOpacity="0.1" />
        <rect x="320" y="300" width="90" height="90" rx="26" fill="#f7c948" fillOpacity="0.9" transform="rotate(-12 365 345)" />
        <circle cx="392" cy="600" r="16" fill="#14143c" fillOpacity="0.9" />
      </svg>

      <div className="relative flex flex-1 flex-col justify-center">
        <BrandIcon size={112} className="drop-shadow-[0_14px_30px_rgba(0,0,0,0.25)]" />
        <div className="mt-6 text-[44px] font-black leading-[1.05] tracking-tight">
          The Good <span className="text-star">Workers</span>
        </div>
        <p className="mt-4 text-[22px] font-semibold leading-snug text-white/95">
          Student gigs, paid, whenever you want.
        </p>
        <ul className="mt-8 space-y-3 text-lg text-white/90">
          <li className="flex gap-3">
            <span>⚡</span> Pick your missions with a swipe
          </li>
          <li className="flex gap-3">
            <span>💸</span> Paid after every mission
          </li>
          <li className="flex gap-3">
            <span>🤗</span> A team that supports you
          </li>
        </ul>
      </div>

      <div className="relative">
        <Link to="/signup" className="block rounded-full bg-white py-4 text-center text-lg font-bold text-teal active:opacity-90">
          Create my account
        </Link>
        <Link to="/login" className="mt-3 block rounded-full border-2 border-white py-4 text-center text-lg font-bold active:bg-white/10">
          I already have an account
        </Link>
        <button type="button" onClick={enterDemo} className="mt-5 w-full text-center text-sm text-white/80 underline underline-offset-4">
          Explore with a demo profile
        </button>
      </div>
    </div>
  );
}
