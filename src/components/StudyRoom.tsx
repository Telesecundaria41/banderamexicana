import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flags } from '../data/flags';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface StudyRoomProps {
  onComplete: () => void;
}

export default function StudyRoom({ onComplete }: StudyRoomProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < flags.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentFlag = flags[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Fase 1: Conoce la Historia</h2>
          <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            {currentIndex + 1} / {flags.length}
          </span>
        </div>

        <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 md:p-10 flex flex-col items-center relative overflow-hidden border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFlag.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full max-w-2xl"
            >
              <div className="h-64 md:h-80 w-full flex items-center justify-center mb-8 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <img
                  src={currentFlag.image}
                  alt={currentFlag.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                {currentFlag.name}
              </h3>
              <div className="flex items-center gap-4 mb-6 text-sm md:text-base">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
                  Año: {currentFlag.year}
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg font-medium">
                  {currentFlag.character}
                </span>
              </div>

              <p className="text-gray-600 text-center text-lg leading-relaxed">
                {currentFlag.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-green-600 hover:bg-green-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-6">
            <button
              onClick={handleNext}
              disabled={currentIndex === flags.length - 1}
              className="p-3 rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-green-600 hover:bg-green-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {currentIndex === flags.length - 1 ? (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1"
            >
              ¡Estoy listo para el Quiz!
              <Play size={20} fill="currentColor" />
            </motion.button>
          ) : (
            <p className="text-gray-500 italic">
              Revisa todas las banderas para continuar.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
