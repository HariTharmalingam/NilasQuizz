import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { socketService } from '../services/socket';
import { questions } from '../data/questions';
import { useQuiz } from '../context/QuizContext';

function AdminView() {
  const { stats } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    console.log("Tentative d'envoi de la question suivante");
    if (currentQuestionIndex < questions.length) {
      const nextQuestion = questions[currentQuestionIndex];
      console.log("Question envoyée:", nextQuestion);
      socketService.nextQuestion(nextQuestion);
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
            Question actuelle: {currentQuestionIndex + 1}/{questions.length}
          </Typography>
          {currentQuestionIndex < questions.length && (
            <Typography sx={{ mt: 2 }}>
              {questions[currentQuestionIndex].text}
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6">Statistiques</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>Réponses totales: {stats?.total || 0}</Typography>
            <Typography>Réponses correctes: {stats?.correct || 0}</Typography>
          </Box>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          sx={{ mt: 3 }}
          disabled={currentQuestionIndex >= questions.length}
        >
          {currentQuestionIndex < questions.length - 1 ? "Question suivante" : "Terminer le quiz"}
        </Button>
      </Box>
    </Container>
  );
}

export default AdminView;