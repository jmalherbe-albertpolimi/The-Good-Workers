import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { AppProvider, type AppState } from './store/AppStore';
import { useAuth, type Session } from './store/AuthStore';
import { DEMO_STATE_KEY, stateKeyFor } from './store/storage';
import { newProfile, newUserState, seedState } from './data/mockData';
import { WelcomeScreen } from './screens/onboarding/WelcomeScreen';
import { SignupScreen } from './screens/onboarding/SignupScreen';
import { LoginScreen } from './screens/onboarding/LoginScreen';
import { PropositionsScreen } from './screens/PropositionsScreen';
import { MissionsScreen } from './screens/MissionsScreen';
import { MissionDetailScreen } from './screens/MissionDetailScreen';
import { ChatScreen } from './screens/ChatScreen';
import { ConversationScreen } from './screens/ConversationScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const TAB_ROUTES = ['/propositions', '/missions', '/chat', '/profil'];

export default function App() {
  const { session } = useAuth();
  return <PhoneFrame>{session ? <MainApp session={session} /> : <OnboardingApp />}</PhoneFrame>;
}

function OnboardingApp() {
  return (
    <Routes>
      <Route path="/bienvenue" element={<WelcomeScreen />} />
      <Route path="/inscription" element={<SignupScreen />} />
      <Route path="/connexion" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/bienvenue" replace />} />
    </Routes>
  );
}

function MainApp({ session }: { session: Session }) {
  const { pathname } = useLocation();
  const showNav = TAB_ROUTES.includes(pathname);

  const storageKey = session.demo ? DEMO_STATE_KEY : stateKeyFor(session.email);
  const fallback = session.demo ? seedState : () => newUserState(newProfile({ email: session.email }));
  const resetState = session.demo ? () => seedState() : (current: AppState) => newUserState(current.profile);

  return (
    <AppProvider key={storageKey} storageKey={storageKey} fallback={fallback} resetState={resetState}>
      <Routes>
        <Route path="/propositions" element={<PropositionsScreen />} />
        <Route path="/missions" element={<MissionsScreen />} />
        <Route path="/missions/:id" element={<MissionDetailScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/chat/:id" element={<ConversationScreen />} />
        <Route path="/profil" element={<ProfileScreen />} />
        <Route path="/parametres" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/propositions" replace />} />
      </Routes>
      {showNav && <BottomNav />}
    </AppProvider>
  );
}
