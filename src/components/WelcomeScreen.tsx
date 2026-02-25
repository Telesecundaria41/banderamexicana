import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flag } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string, grade: string) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && grade.trim()) {
      onStart(name, grade);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 via-white to-red-50"
    >
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <Flag size={48} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Evolución de la Bandera Mexicana
        </h1>
        <p className="text-center text-gray-500 mb-8">
          ¡Demuestra tus conocimientos sobre la historia de nuestro lábaro patrio!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grado y Grupo
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
              required
            >
              <option value="" disabled>Selecciona tu grado</option>
              <option value="1° A">1° A</option>
              <option value="2° A">2° A</option>
              <option value="3° A">3° A</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !grade.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            Comenzar Aventura
          </button>
        </form>
      </div>
    </motion.div>
  );
}
