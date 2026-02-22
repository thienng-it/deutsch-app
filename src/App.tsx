import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import VocabularyPage from './pages/Vocabulary';
import VocabularyTopicPage from './pages/VocabularyTopic';
import GrammarPage from './pages/Grammar';
import ReadingPage from './pages/Reading';
import SpeakingPage from './pages/Speaking';
import WritingPage from './pages/Writing';
import PrepositionsPage from './pages/Prepositions';
import AlphabetPage from './pages/Alphabet';
import NumbersPage from './pages/Numbers';

// Games
import FlipCards from './pages/Games/FlipCards';
import MultipleChoice from './pages/Games/MultipleChoice';
import MemoryCards from './pages/Games/MemoryCards';
import WordScramble from './pages/Games/WordScramble';
import FillInBlank from './pages/Games/FillInBlank';
import SpeedRound from './pages/Games/SpeedRound';
import GamesHub from './pages/Games/GamesHub';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="reading" element={<ReadingPage />} />
        <Route path="speaking" element={<SpeakingPage />} />
        <Route path="writing" element={<WritingPage />} />
        <Route path="grammar" element={<GrammarPage />} />
        <Route path="vocabulary" element={<VocabularyPage />} />
        <Route path="vocabulary/:topic" element={<VocabularyTopicPage />} />
        <Route path="prepositions" element={<PrepositionsPage />} />
        <Route path="alphabet" element={<AlphabetPage />} />
        <Route path="numbers" element={<NumbersPage />} />

        {/* Games */}
        <Route path="games" element={<GamesHub />} />
        <Route path="games/flip-cards" element={<FlipCards />} />
        <Route path="games/multiple-choice" element={<MultipleChoice />} />
        <Route path="games/memory" element={<MemoryCards />} />
        <Route path="games/scramble" element={<WordScramble />} />
        <Route path="games/fill-blank" element={<FillInBlank />} />
        <Route path="games/speed" element={<SpeedRound />} />
      </Route>
    </Routes>
  );
}
