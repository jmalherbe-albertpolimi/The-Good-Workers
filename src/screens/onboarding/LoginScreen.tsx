import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../store/AuthStore';
import { BrandIcon } from '../../components/BrandIcon';
import { Field, StepTitle, inputClass } from './ui';

export function LoginScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const result = await signIn(email, password);
    setBusy(false);
    if (!result.ok) setError(result.error);
  };

  return (
    <div className="flex h-full flex-col bg-paper">
      <header className="px-4 pt-[max(env(safe-area-inset-top),16px)]">
        <button type="button" onClick={() => navigate('/bienvenue')} aria-label="Retour" className="-ml-2 rounded-full p-2 active:bg-tile">
          <ChevronLeft size={28} />
        </button>
      </header>

      <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-5 pt-2">
          <div className="mb-6 flex justify-center">
            <BrandIcon size={80} />
          </div>
          <StepTitle title="Content de te revoir !" subtitle="Connecte-toi pour retrouver tes missions." />
          <div className="space-y-4">
            <Field label="Email">
              <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="toi@email.fr" />
            </Field>
            <Field label="Mot de passe">
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? 'Masquer' : 'Afficher'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted">
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </Field>
          </div>
          <button
            type="button"
            onClick={() => setInfo('La réinitialisation par email sera disponible avec le back office.')}
            className="mt-4 text-sm font-semibold text-muted underline underline-offset-4"
          >
            Mot de passe oublié ?
          </button>
          {info && <p className="mt-2 text-sm text-muted">{info}</p>}
        </div>

        <div className="px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-3">
          {error && <p className="mb-3 text-center text-sm font-semibold text-danger">{error}</p>}
          <button type="submit" disabled={busy || !email || !password} className="w-full rounded-full bg-teal py-4 text-lg font-bold text-white disabled:opacity-50">
            {busy ? 'Connexion…' : 'Se connecter'}
          </button>
          <p className="mt-4 text-center text-sm text-muted">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="font-bold text-teal underline underline-offset-4">
              Créer mon compte
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
