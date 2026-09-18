import { useLang } from '../i18n/LanguageProvider';
import { LANGS } from '../i18n/lang';

export function LanguagePicker({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { lang, setLang } = useLang();
  const onLight = variant === 'light';

  return (
    <div className={`flex gap-1 rounded-full p-1 ${onLight ? 'bg-white/20' : 'bg-tile'}`}>
      {LANGS.map(({ code, label, flag }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
              active ? 'bg-white text-teal shadow' : onLight ? 'text-white' : 'text-muted'
            }`}
          >
            <span aria-hidden="true">{flag}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
