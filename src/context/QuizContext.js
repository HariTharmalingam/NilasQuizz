import React, { createContext, useContext, useState, useEffect } from 'react';
import { socket } from '../services/socket';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizState, setQuizState] = useState({
    currentQuestion: null,
    stats: { total: 0, correct: 0 },
    questionHistory: [],
    isQuizActive: false,
    isQuizEnded: false,
    finalStats: null
  });

  useEffect(() => {
    // Ajouter le gestionnaire de fin de quiz
    const handleQuizEnd = (data) => {
      setQuizState(prev => ({
        ...prev,
        isQuizEnded: true,
        currentQuestion: null,
        finalStats: data.stats
      }));
    };

    socket.on('quiz-end', handleQuizEnd);

    // Gestion du statut du quiz
    const handleQuizStatus = ({ isStarted }) => {
      console.log("Quiz status update:", isStarted);
      setQuizState(prev => ({
        ...prev,
        isQuizActive: isStarted,
        currentQuestion: isStarted ? prev.currentQuestion : null
      }));
    };

    // Gestion des nouvelles questions
    const handleQuestion = (question) => {
      console.log("New question received:", question);
      setQuizState(prev => ({
        ...prev,
        currentQuestion: question,
        questionHistory: prev.currentQuestion 
          ? [...prev.questionHistory, { question: prev.currentQuestion, stats: prev.stats }]
          : prev.questionHistory
      }));
    };

    // Gestion des mises à jour de stats
    const handleStats = (newStats) => {
      console.log("New stats received:", newStats);
      setQuizState(prev => ({
        ...prev,
        stats: newStats
      }));
    };

    // Setup des listeners socket
    socket.on('quiz-status', handleQuizStatus);
    socket.on('question', handleQuestion);
    socket.on('stats-update', handleStats);

    // Demande initiale du statut
    socket.emit('get-current-status');

    // Cleanup des listeners au démontage
    return () => {
      socket.off('quiz-status', handleQuizStatus);
      socket.off('question', handleQuestion);
      socket.off('stats-update', handleStats);
      socket.off('quiz-end', handleQuizEnd);
    };
  }, []); // Plus aucune dépendance

  return (
    <QuizContext.Provider value={quizState}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz doit être utilisé à l\'intérieur d\'un QuizProvider');
  }
  return context;
};