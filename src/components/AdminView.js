import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { socket } from '../services/socket';
import { questions } from '../data/questions';

function AdminView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    correct: 0
  });

  useEffect(() => {
    // Écouter les mises à jour des statistiques
    socket.on('stats-update', (newStats) => {
      console.log('Nouvelles stats reçues:', newStats);
      setStats(newStats);
    });

    // Nettoyage à la déconnexion
    return () => {
      socket.off('stats-update');
    };
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const nextQuestion = questions[currentQuestionIndex];
      console.log('Envoi de la question suivante:', nextQuestion);
      socket.emit('admin:next-question', nextQuestion);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Panel Administrateur
        </Typography>
        
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6">
            Question actuelle: {currentQuestionIndex}/{questions.length}
          </Typography>
          {currentQuestionIndex > 0 && currentQuestionIndex <= questions.length && (
            <Typography sx={{ mt: 2 }}>
              Question en cours: {questions[currentQuestionIndex - 1].text}
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6">Statistiques en direct</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>Réponses totales: {stats.total}</Typography>
            <Typography>Réponses correctes: {stats.correct}</Typography>
          </Box>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          sx={{ mt: 3 }}
          disabled={currentQuestionIndex >= questions.length}
        >
          {currentQuestionIndex < questions.length ? "Question suivante" : "Terminer le quiz"}
        </Button>
      </Box>
    </Container>
  );
}

export default AdminView;