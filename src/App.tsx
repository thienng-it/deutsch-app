import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import PasscodeGate from './pages/Login';
import Dashboard from './pages/Dashboard';
import VocabularyPage from './pages/Vocabulary';
import GrammarPage from './pages/Grammar';
import ListeningPage from './pages/Listening';
import MaterialsPage from './pages/Materials';
import ProgressPage from './pages/Progress';
import LearningPlanPage from './pages/LearningPlan';
import ProfilePage from './pages/Profile';
import PrepositionsPage from './pages/Prepositions';

// Games
import FlipCards from './pages/Games/FlipCards';
import MultipleChoice from './pages/Games/MultipleChoice';
import MemoryCards from './pages/Games/MemoryCards';
import WordScramble from './pages/Games/WordScramble';
import FillInBlank from './pages/Games/FillInBlank';
import SpeedRound from './pages/Games/SpeedRound';
import GamesHub from './pages/Games/GamesHub';

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-4xl animate-pulse">🇩🇪</div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  // Not unlocked → show passcode gate for every route
  if (!user) return <PasscodeGate />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LearningPlanPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vocabulary" element={<VocabularyPage />} />
        <Route path="grammar" element={<GrammarPage />} />
        <Route path="listening" element={<ListeningPage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="prepositions" element={<PrepositionsPage />} />

        {/* Games */}
        <Route path="games" element={<GamesHub />} />
        <Route path="games/flip-cards" element={<FlipCards />} />
        <Route path="games/multiple-choice" element={<MultipleChoice />} />
        <Route path="games/memory" element={<MemoryCards />} />
        <Route path="games/scramble" element={<WordScramble />} />
        <Route path="games/fill-blank" element={<FillInBlank />} />
        <Route path="games/speed" element={<SpeedRound />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
