import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Star } from 'lucide-react';

interface ResultsScreenProps {
  name: string;
  grade: string;
  quizScore: number;
  matchScore: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function ResultsScreen({
  name,
  grade,
  quizScore,
  matchScore,
  totalQuestions,
  onRestart,
}: ResultsScreenProps) {
  const totalScore = quizScore * 10 + matchScore; // 10 points per quiz question + match score
  const maxScore = totalQuestions * 10 + 50; // max 50 points for match game
  const percentage = (totalScore / maxScore) * 100;

  useEffect(() => {
    if (percentage > 60) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    }
  }, [percentage]);

  let feedbackMessage = '';
  if (percentage >= 90) {
    feedbackMessage = '¡Excelente! Eres un experto en la historia de nuestra bandera.';
  } else if (percentage >= 70) {
    feedbackMessage = '¡Muy bien! Tienes un buen conocimiento de nuestra historia.';
  } else if (percentage >= 50) {
    feedbackMessage = '¡Buen esfuerzo! Pero aún puedes aprender más sobre nuestra bandera.';
  } else {
    feedbackMessage = 'Necesitas repasar más. ¡No te rindas, vuelve a intentarlo!';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex flex-col items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-green-500 via-white to-red-500 opacity-10"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-yellow-100 rounded-full text-yellow-600 shadow-inner">
              <Trophy size={64} />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            ¡Felicidades, {name}!
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-medium">
            Estudiante de {grade}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">Trivia</p>
              <p className="text-3xl font-black text-blue-900">{quizScore}/{totalQuestions}</p>
              <p className="text-xs text-blue-500 mt-1">Aciertos</p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
              <p className="text-sm text-purple-600 font-bold uppercase tracking-wider mb-2">Unión</p>
              <p className="text-3xl font-black text-purple-900">{matchScore}</p>
              <p className="text-xs text-purple-500 mt-1">Puntos</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <p className="text-sm text-green-600 font-bold uppercase tracking-wider mb-2">Total</p>
              <p className="text-3xl font-black text-green-900">{totalScore}</p>
              <p className="text-xs text-green-500 mt-1">De {maxScore} posibles</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-200">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  className={i < Math.round((percentage / 100) * 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-xl text-gray-800 font-medium italic">
              "{feedbackMessage}"
            </p>
          </div>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <RefreshCw size={20} />
            Jugar de Nuevo
          </button>
        </div>
      </div>
    </motion.div>
  );
}
