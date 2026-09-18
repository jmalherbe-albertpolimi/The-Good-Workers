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
import { ProposalsScreen } from './screens/ProposalsScreen';
import { MissionsScreen } from './screens/MissionsScreen';
import { MissionDetailScreen } from './screens/MissionDetailScreen';
import { ChatScreen } from './screens/ChatScreen';
import { ConversationScreen } from './screens/ConversationScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const TAB_ROUTES = ['/proposals', '/missions', '/chat', '/profile'];

export default function App() {
  const { session } = useAuth();
  return <PhoneFrame>{session ? <MainApp session={session} /> : <OnboardingApp />}</PhoneFrame>;
}

function OnboardingApp() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
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
        <Route path="/proposals" element={<ProposalsScreen />} />
        <Route path="/missions" element={<MissionsScreen />} />
        <Route path="/missions/:id" element={<MissionDetailScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/chat/:id" element={<ConversationScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/proposals" replace />} />
      </Routes>
      {showNav && <BottomNav />}
    </AppProvider>
  );
}
