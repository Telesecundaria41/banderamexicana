import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Star, FileText, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

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
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Background colors (Mexican Flag style)
      doc.setFillColor(0, 104, 71); // Green
      doc.rect(0, 0, 20, pageHeight, 'F');
      
      doc.setFillColor(255, 255, 255); // White
      doc.rect(20, 0, pageWidth - 40, pageHeight, 'F');

      doc.setFillColor(206, 17, 38); // Red
      doc.rect(pageWidth - 20, 0, 20, pageHeight, 'F');

      // Border
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Header
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(30);
      doc.setFont('helvetica', 'bold');
      doc.text('CONSTANCIA DE APRENDIZAJE', pageWidth / 2, 40, { align: 'center' });

      doc.setFontSize(20);
      doc.setFont('helvetica', 'normal');
      doc.text('Evolución Histórica de la Bandera Mexicana', pageWidth / 2, 55, { align: 'center' });

      // Content
      doc.setFontSize(16);
      doc.text('Se otorga la presente a:', pageWidth / 2, 80, { align: 'center' });

      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 104, 71);
      doc.text(name.toUpperCase(), pageWidth / 2, 95, { align: 'center' });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(`Estudiante de: ${grade}`, pageWidth / 2, 110, { align: 'center' });

      doc.text('Por haber completado con éxito la actividad interactiva.', pageWidth / 2, 125, { align: 'center' });

      // Scores
      doc.setDrawColor(200, 200, 200);
      doc.line(40, 135, pageWidth - 40, 135);

      doc.setFontSize(14);
      doc.text(`Aciertos en Trivia: ${quizScore} de ${totalQuestions}`, 60, 150);
      doc.text(`Puntos en Juego de Unión: ${matchScore}`, 60, 160);
      doc.setFont('helvetica', 'bold');
      doc.text(`Puntaje Total: ${totalScore} / ${maxScore}`, 60, 175);

      // Date
      const today = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Fecha: ${today}`, pageWidth - 60, 185, { align: 'right' });

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Generado automáticamente por la App Educativa de la Bandera de México', pageWidth / 2, pageHeight - 15, { align: 'center' });

      doc.save(`Comprobante_${name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <FileText size={20} />
              )}
              Descargar Comprobante PDF
            </button>

            <button
              onClick={onRestart}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <RefreshCw size={20} />
              Jugar de Nuevo
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

