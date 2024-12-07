// src/services/socket.js
import { io } from 'socket.io-client';

// Création d'une instance unique de socket

  export const socket = io('https://nilasquizz.glitch.me');

// Événements de base
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


socket.on('connect_error', (error) => {
  console.error('Erreur de connexion:', error);
});


// Fonctions d'aide pour les événements communs
export const socketService = {
  // Pour les participants
  submitAnswer: (answer) => {
    socket.emit('submit-answer', answer);
  },
  
  // Pour l'admin
  nextQuestion: (question) => {
    socket.emit('admin:next-question', question);
  },
  
  endQuiz: () => {
    socket.emit('admin:end-quiz');
  },
  
  // Méthodes pour s'abonner aux événements
  onQuestionChange: (callback) => {
    socket.on('question', callback);
  },
  
  onStatsUpdate: (callback) => {
    socket.on('stats-update', callback);
  },
  
  onQuizEnd: (callback) => {
    socket.on('quiz-ended', callback);
  },
  
  // Nettoyage des listeners
  cleanup: () => {
    socket.off('question');
    socket.off('stats-update');
    socket.off('quiz-ended');
  }
};

