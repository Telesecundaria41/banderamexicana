import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions } from '../data/questions';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface QuizGameProps {
  onComplete: (score: number) => void;
}

export default function QuizGame({ onComplete }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Fase 2: Trivia Histórica</h2>
          <div className="flex gap-4">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Pregunta {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
              Puntos: {score}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h3>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showCorrect = isAnswered && isCorrect;
                  const showIncorrect = isAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswered}
                      className={clsx(
                        "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between",
                        !isAnswered && "border-gray-200 hover:border-green-400 hover:bg-green-50",
                        showCorrect && "border-green-500 bg-green-50 text-green-900",
                        showIncorrect && "border-red-500 bg-red-50 text-red-900",
                        isAnswered && !isSelected && !isCorrect && "border-gray-100 opacity-50"
                      )}
                    >
                      <span className="font-medium text-lg">{option}</span>
                      {showCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                      {showIncorrect && <XCircle className="text-red-500" size={24} />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "mt-8 p-6 rounded-2xl",
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "bg-green-100 text-green-900"
                      : "bg-red-100 text-red-900"
                  )}
                >
                  <p className="font-bold mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "¡Correcto!"
                      : "Incorrecto"}
                  </p>
                  <p className="text-sm md:text-base opacity-90 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex justify-end"
            >
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-transform transform hover:-translate-y-1"
              >
                {currentQuestionIndex < questions.length - 1 ? "Siguiente Pregunta" : "Finalizar Trivia"}
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
