import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import WelcomeScreen from './components/WelcomeScreen';
import StudyRoom from './components/StudyRoom';
import QuizGame from './components/QuizGame';
import MatchGame from './components/MatchGame';
import ResultsScreen from './components/ResultsScreen';
import { questions } from './data/questions';

type GameState = 'welcome' | 'study' | 'quiz' | 'match' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [student, setStudent] = useState({ name: '', grade: '' });
  const [quizScore, setQuizScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);

  const handleStart = (name: string, grade: string) => {
    setStudent({ name, grade });
    setGameState('study');
  };

  const handleStudyComplete = () => {
    setGameState('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setGameState('match');
  };

  const handleMatchComplete = (score: number) => {
    setMatchScore(score);
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('welcome');
    setStudent({ name: '', grade: '' });
    setQuizScore(0);
    setMatchScore(0);
  };

  return (
    <div className="font-sans text-gray-900 antialiased selection:bg-green-200">
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        {gameState === 'study' && (
          <StudyRoom key="study" onComplete={handleStudyComplete} />
        )}
        {gameState === 'quiz' && (
          <QuizGame key="quiz" onComplete={handleQuizComplete} />
        )}
        {gameState === 'match' && (
          <MatchGame key="match" onComplete={handleMatchComplete} />
        )}
        {gameState === 'results' && (
          <ResultsScreen
            key="results"
            name={student.name}
            grade={student.grade}
            quizScore={quizScore}
            matchScore={matchScore}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
