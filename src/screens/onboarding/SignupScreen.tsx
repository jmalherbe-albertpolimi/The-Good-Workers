import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { ALL_CATEGORIES, ALL_REGIONS, STUDY_LEVELS, categoryKey, regionKey, studyLevelKey, type Category, type StudyLevel } from '../../data/types';
import { newProfile } from '../../data/mockData';
import { useAuth } from '../../store/AuthStore';
import { useLang } from '../../i18n/LanguageProvider';
import type { TranslationKey } from '../../i18n/dict';
import { Chip, Field, OptionCard, StepTitle, inputClass } from './ui';

type Step = 'account' | 'identity' | 'studies' | 'status' | 'preferences' | 'done';
const STEPS: Step[] = ['account', 'identity', 'studies', 'status', 'preferences', 'done'];

interface Form {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  school: string;
  studyLevel: StudyLevel | '';
  city: string;
  hasSiret: boolean | null;
  siret: string;
  regions: string[];
  categories: Category[];
}

const EMPTY: Form = {
  email: '', password: '', firstName: '', lastName: '', phone: '', birthDate: '',
  school: '', studyLevel: '', city: '', hasSiret: null, siret: '', regions: [], categories: [],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digits = (s: string) => s.replace(/\D/g, '');

function formatBirthInput(value: string) {
  const d = digits(value).slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

function birthToIso(value: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  const valid = date.getFullYear() === Number(yyyy) && date.getMonth() === Number(mm) - 1 && date.getDate() === Number(dd);
  return valid ? `${yyyy}-${mm}-${dd}` : null;
}

function ageOf(birthDate: string) {
  const b = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(b.getTime())) return 0;
  const t = new Date();
  const age = t.getFullYear() - b.getFullYear();
  const beforeBirthday = t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate());
  return beforeBirthday ? age - 1 : age;
}

function stepError(step: Step, f: Form): TranslationKey | null {
  switch (step) {
    case 'account':
      if (!EMAIL_RE.test(f.email.trim())) return 'error.invalidEmail';
      if (f.password.length < 8) return 'error.shortPassword';
      return null;
    case 'identity':
      if (!f.firstName.trim() || !f.lastName.trim()) return 'error.nameRequired';
      if (digits(f.phone).length !== 10) return 'error.phoneDigits';
      {
        const iso = birthToIso(f.birthDate);
        if (!iso) return 'error.birthFormat';
        if (ageOf(iso) < 18) return 'error.age18';
      }
      return null;
    case 'studies':
      if (!f.school.trim()) return 'error.schoolRequired';
      if (!f.studyLevel) return 'error.levelRequired';
      if (!f.city.trim()) return 'error.cityRequired';
      return null;
    case 'status':
      if (f.hasSiret === null) return 'error.answerQuestion';
      if (f.hasSiret && digits(f.siret).length !== 14) return 'error.siretDigits';
      return null;
    case 'preferences':
      if (f.regions.length === 0) return 'error.regionRequired';
      if (f.categories.length === 0) return 'error.categoryRequired';
      return null;
    case 'done':
      return null;
  }
}

export function SignupScreen() {
  const navigate = useNavigate();
  const { signUp, emailExists } = useAuth();
  const { t } = useLang();
  const [form, setForm] = useState<Form>(EMPTY);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [showError, setShowError] = useState(false);
  const [extraError, setExtraError] = useState<TranslationKey | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);

  const step = STEPS[index];
  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));
  const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  const errorKey = extraError ?? stepError(step, form);
  const regionLabel = (region: string) => {
    const key = regionKey(region);
    return key ? t(key) : region;
  };

  const goTo = (next: number) => {
    setDir(next > index ? 1 : -1);
    setShowError(false);
    setExtraError(null);
    setIndex(next);
  };

  const next = () => {
    if (stepError(step, form)) {
      setShowError(true);
      return;
    }
    if (step === 'account' && emailExists(form.email)) {
      setExtraError('error.emailExists');
      setShowError(true);
      return;
    }
    goTo(index + 1);
  };

  const back = () => (index === 0 ? navigate('/welcome') : goTo(index - 1));

  const finish = async () => {
    setBusy(true);
    const profile = newProfile({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      birthDate: birthToIso(form.birthDate) ?? '',
      school: form.school.trim(),
      studyLevel: form.studyLevel,
      city: form.city.trim(),
      siret: form.hasSiret ? digits(form.siret) : '',
      regions: form.regions,
      favoriteCategories: form.categories,
    });
    const result = await signUp(form.email, form.password, profile);
    setBusy(false);
    if (!result.ok) {
      setExtraError(result.errorKey);
      setShowError(true);
    }
  };

  if (step === 'done') {
    return (
      <div className="flex h-full flex-col bg-teal px-6 pb-[max(env(safe-area-inset-bottom),24px)] pt-[max(env(safe-area-inset-top),24px)] text-center text-white">
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[96px] leading-none">🎉</span>
          <h1 className="mt-6 text-[36px] font-black leading-tight">{t('signup.done.title', { name: form.firstName.trim() })}</h1>
          <p className="mt-4 text-lg text-white/90">{t('signup.done.body')}</p>
        </div>
        {showError && errorKey && <p className="mb-3 text-sm font-semibold text-[#ffd6d6]">{t(errorKey)}</p>}
        <button type="button" onClick={finish} disabled={busy} className="w-full rounded-full bg-white py-4 text-lg font-bold text-teal disabled:opacity-60">
          {busy ? t('signup.done.ctaBusy') : t('signup.done.cta')}
        </button>
      </div>
    );
  }

  const progressSteps = STEPS.length - 1;

  return (
    <div className="flex h-full flex-col bg-paper">
      <header className="flex items-center gap-2 px-4 pt-[max(env(safe-area-inset-top),16px)]">
        <button type="button" onClick={back} aria-label={t('common.back')} className="-ml-2 rounded-full p-2 active:bg-tile">
          <ChevronLeft size={28} />
        </button>
        <div className="flex flex-1 gap-1.5">
          {STEPS.slice(0, progressSteps).map((s, i) => (
            <span key={s} className={`h-1.5 flex-1 rounded-full ${i <= index ? 'bg-teal' : 'bg-black/10'}`} />
          ))}
        </div>
        <span className="ml-2 text-sm font-semibold text-muted">
          {index + 1}/{progressSteps}
        </span>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ x: dir * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -dir * 40, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {step === 'account' && (
                <>
                  <StepTitle title={t('signup.account.title')} subtitle={t('signup.account.subtitle')} />
                  <div className="space-y-4">
                    <Field label={t('common.email')}>
                      <input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} placeholder={t('common.emailPlaceholder')} autoFocus />
                    </Field>
                    <Field label={t('common.password')} hint={t('signup.account.passwordHint')}>
                      <div className="relative">
                        <input
                          type={showPw ? 'text' : 'password'}
                          autoComplete="new-password"
                          value={form.password}
                          onChange={(e) => set('password', e.target.value)}
                          className={`${inputClass} pr-12`}
                        />
                        <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? t('common.hide') : t('common.show')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted">
                          {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </Field>
                  </div>
                </>
              )}

              {step === 'identity' && (
                <>
                  <StepTitle title={t('signup.identity.title')} subtitle={t('signup.identity.subtitle')} />
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label={t('common.firstName')}>
                        <input autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputClass} autoFocus />
                      </Field>
                      <Field label={t('common.lastName')}>
                        <input autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputClass} />
                      </Field>
                    </div>
                    <Field label={t('common.phone')}>
                      <input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} placeholder="06 12 34 56 78" />
                    </Field>
                    <Field label={t('signup.identity.birthDate')} hint={t('signup.identity.birthHint')}>
                      <input
                        inputMode="numeric"
                        autoComplete="bday"
                        placeholder={t('signup.identity.birthPlaceholder')}
                        maxLength={10}
                        value={form.birthDate}
                        onChange={(e) => set('birthDate', formatBirthInput(e.target.value))}
                        className={`${inputClass} tnum`}
                      />
                    </Field>
                  </div>
                </>
              )}

              {step === 'studies' && (
                <>
                  <StepTitle title={t('signup.studies.title')} subtitle={t('signup.studies.subtitle')} />
                  <div className="space-y-4">
                    <Field label={t('signup.studies.school')}>
                      <input value={form.school} onChange={(e) => set('school', e.target.value)} className={inputClass} placeholder={t('signup.studies.schoolPlaceholder')} autoFocus />
                    </Field>
                    <Field label={t('signup.studies.level')}>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {STUDY_LEVELS.map((lvl) => (
                          <Chip key={lvl} active={form.studyLevel === lvl} onClick={() => set('studyLevel', lvl)}>
                            {t(studyLevelKey(lvl))}
                          </Chip>
                        ))}
                      </div>
                    </Field>
                    <Field label={t('signup.studies.city')}>
                      <input autoComplete="address-level2" value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} placeholder={t('signup.studies.cityPlaceholder')} />
                    </Field>
                  </div>
                </>
              )}

              {step === 'status' && (
                <>
                  <StepTitle title={t('signup.status.title')} subtitle={t('signup.status.subtitle')} />
                  <div className="space-y-3">
                    <OptionCard active={form.hasSiret === true} onClick={() => set('hasSiret', true)} title={t('signup.status.yes')} description={t('signup.status.yesDesc')} />
                    <OptionCard active={form.hasSiret === false} onClick={() => set('hasSiret', false)} title={t('signup.status.no')} description={t('signup.status.noDesc')} />
                  </div>
                  {form.hasSiret === true && (
                    <div className="mt-5">
                      <Field label={t('signup.status.siret')} hint={t('signup.status.siretHint')}>
                        <input inputMode="numeric" value={form.siret} onChange={(e) => set('siret', e.target.value)} className={`${inputClass} tnum`} placeholder="123 456 789 00012" autoFocus />
                      </Field>
                    </div>
                  )}
                  {form.hasSiret === false && (
                    <div className="mt-5 rounded-2xl bg-teal-light p-4 text-[15px] leading-relaxed">
                      <span className="font-bold">{t('signup.status.noWorriesBold')}</span> {t('signup.status.noWorries')}
                    </div>
                  )}
                </>
              )}

              {step === 'preferences' && (
                <>
                  <StepTitle title={t('signup.prefs.title')} subtitle={t('signup.prefs.subtitle')} />
                  <Field label={t('signup.prefs.regions')}>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {ALL_REGIONS.map((r) => (
                        <Chip key={r} active={form.regions.includes(r)} onClick={() => set('regions', toggle(form.regions, r))}>
                          {regionLabel(r)}
                        </Chip>
                      ))}
                    </div>
                  </Field>
                  <div className="mt-6">
                    <Field label={t('signup.prefs.categories')}>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ALL_CATEGORIES.map((c) => (
                          <Chip key={c} active={form.categories.includes(c)} onClick={() => set('categories', toggle(form.categories, c))}>
                            {t(categoryKey(c))}
                          </Chip>
                        ))}
                      </div>
                    </Field>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-3">
          {showError && errorKey && <p className="mb-3 text-center text-sm font-semibold text-danger">{t(errorKey)}</p>}
          <button type="submit" className="w-full rounded-full bg-teal py-4 text-lg font-bold text-white active:opacity-90">
            {t('common.continue')}
          </button>
        </div>
      </form>
    </div>
  );
}
