import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flags } from '../data/flags';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

interface MatchGameProps {
  onComplete: (score: number) => void;
}

export default function MatchGame({ onComplete }: MatchGameProps) {
  const [shuffledFlags, setShuffledFlags] = useState([...flags].sort(() => Math.random() - 0.5).slice(0, 5));
  const [shuffledNames, setShuffledNames] = useState([...shuffledFlags].sort(() => Math.random() - 0.5));
  
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    if (selectedFlag && selectedName) {
      if (selectedFlag === selectedName) {
        setMatchedPairs((prev) => [...prev, selectedFlag]);
        setSelectedFlag(null);
        setSelectedName(null);
      } else {
        setMistakes((prev) => prev + 1);
        setTimeout(() => {
          setSelectedFlag(null);
          setSelectedName(null);
        }, 800);
      }
    }
  }, [selectedFlag, selectedName]);

  const isComplete = matchedPairs.length === shuffledFlags.length;
  const score = Math.max(0, 50 - mistakes * 10); // Max 50 points, -10 per mistake

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Fase 3: Une la Bandera</h2>
          <div className="flex gap-4">
            <span className="px-4 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
              Errores: {mistakes}
            </span>
            <span className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
              Puntos Posibles: {score}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          <p className="text-center text-gray-600 mb-8 text-lg">
            Selecciona una imagen y luego su nombre correspondiente.
          </p>

          {!isComplete && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flags Column */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-700 mb-4 text-center">Banderas</h3>
                {shuffledFlags.map((flag) => {
                  const isMatched = matchedPairs.includes(flag.id);
                  const isSelected = selectedFlag === flag.id;

                  return (
                    <button
                      key={`img-${flag.id}`}
                      onClick={() => !isMatched && setSelectedFlag(flag.id)}
                      disabled={isMatched}
                      className={clsx(
                        "w-full h-32 p-2 rounded-2xl border-2 transition-all flex items-center justify-center relative overflow-hidden",
                        !isMatched && !isSelected && "border-gray-200 hover:border-purple-400 hover:bg-purple-50",
                        isSelected && "border-purple-500 bg-purple-50 ring-4 ring-purple-100",
                        isMatched && "border-green-500 bg-green-50 opacity-50 cursor-not-allowed"
                      )}
                    >
                      <img
                        src={flag.image}
                        alt="Bandera"
                        className="max-h-full max-w-full object-contain drop-shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      {isMatched && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="text-green-600 w-12 h-12" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Names Column */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-700 mb-4 text-center">Nombres</h3>
                {shuffledNames.map((flag) => {
                  const isMatched = matchedPairs.includes(flag.id);
                  const isSelected = selectedName === flag.id;

                  return (
                    <button
                      key={`name-${flag.id}`}
                      onClick={() => !isMatched && setSelectedName(flag.id)}
                      disabled={isMatched}
                      className={clsx(
                        "w-full h-32 p-4 rounded-2xl border-2 transition-all flex items-center justify-center text-center",
                        !isMatched && !isSelected && "border-gray-200 hover:border-blue-400 hover:bg-blue-50",
                        isSelected && "border-blue-500 bg-blue-50 ring-4 ring-blue-100",
                        isMatched && "border-green-500 bg-green-50 opacity-50 cursor-not-allowed"
                      )}
                    >
                      <span className="font-bold text-lg md:text-xl text-gray-800">
                        {flag.name}
                      </span>
                      {isMatched && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center pointer-events-none">
                          <CheckCircle2 className="text-green-600 w-12 h-12 opacity-50" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 flex flex-col items-center"
            >
              <div className="p-4 bg-green-100 text-green-800 rounded-full mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Excelente Trabajo!</h3>
              <p className="text-gray-600 mb-8">Has unido correctamente todas las banderas.</p>
              
              <button
                onClick={() => onComplete(score)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
              >
                Ver Resultados Finales
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
