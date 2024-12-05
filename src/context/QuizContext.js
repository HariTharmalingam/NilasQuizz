// src/context/QuizContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { socketService } from '../services/socket';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [stats, setStats] = useState({ total: 0, correct: 0 });
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    socketService.onQuestionChange((question) => {
      setCurrentQuestion(question);
      setIsQuizActive(true);
    });

    socketService.onStatsUpdate((newStats) => {
      setStats(newStats);
      // Ajouter les stats à l'historique
      setQuestionHistory(prev => [...prev, { question: currentQuestion, stats: newStats }]);
    });

    socketService.onQuizEnd((finalStats) => {
      setIsQuizActive(false);
      // Sauvegarder les stats finales
      setQuestionHistory(prev => [...prev, { final: true, stats: finalStats }]);
    });

    return () => socketService.cleanup();
  }, [currentQuestion]);

  const value = {
    currentQuestion,
    stats,
    questionHistory,
    isQuizActive,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuiz = () => useContext(QuizContext);