// src/components/AdminView.js
import React, { useState } from 'react';
import { Box, Button, Typography, Container, Paper, Grid, CircularProgress } from '@mui/material';
import { useQuiz } from '../context/QuizContext';
import { socketService } from '../services/socket';

function AdminView() {
  const { stats, questionHistory, isQuizActive } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const questions = [
    {
      id: 1,
      text: "Première question",
      options: ["A", "B", "C", "D"],
      correct: "A"
    },
    // Ajoutez vos questions ici
  ];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      socketService.nextQuestion(nextQuestion);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      socketService.endQuiz();
    }
  };

  const renderStats = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Statistiques en direct
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">{stats.total}</Typography>
            <Typography variant="body2">Réponses totales</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">
              {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
            </Typography>
            <Typography variant="body2">Réponses correctes</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderQuestionHistory = () => (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Historique des questions
      </Typography>
      {questionHistory.map((entry, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle1">
            Question {index + 1}
          </Typography>
          <Typography variant="body2">
            Taux de réussite: {entry.stats.correct}/{entry.stats.total} 
            ({entry.stats.total > 0 ? Math.round((entry.stats.correct / entry.stats.total) * 100) : 0}%)
          </Typography>
        </Box>
      ))}
    </Paper>
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Panel Administrateur
        </Typography>

        {renderStats()}

        <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={!isQuizActive}
          >
            {currentQuestionIndex < questions.length - 1 ? "Question suivante" : "Terminer le quiz"}
          </Button>
        </Box>

        {renderQuestionHistory()}
      </Box>
    </Container>
  );
}

export default AdminView;