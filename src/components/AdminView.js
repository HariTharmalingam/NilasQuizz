import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper, LinearProgress } from '@mui/material';
import { socket } from '../services/socket';
import { questions } from '../data/questions';

function AdminView() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [questionStats, setQuestionStats] = useState({ total: 0, correct: 0, incorrect: 0 });

  useEffect(() => {
    socket.on('question-stats', (stats) => {
      setQuestionStats(stats);
    });

    return () => {
      socket.off('question-stats');
    };
  }, []);

  const startQuiz = () => {
    console.log("Démarrage du quiz");
    socket.emit('admin:start-quiz');
    setIsQuizStarted(true);
    handleNextQuestion();
  };

  const resetQuiz = () => {
    socket.emit('admin:reset-quiz');
    setIsQuizStarted(false);
    setCurrentQuestionIndex(-1);
    setQuestionStats({ total: 0, correct: 0, incorrect: 0 });
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    console.log("Prochain index:", nextIndex);

    if (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      console.log("Envoi de la question:", nextQuestion);
      socket.emit('admin:next-question', nextQuestion);
      setCurrentQuestionIndex(nextIndex);
      setQuestionStats({ total: 0, correct: 0, incorrect: 0 });
    }
  };

  const handleEndQuiz = () => {
    console.log("Fin du quiz");
    socket.emit('admin:end-quiz');
    setIsQuizStarted(false);
    setCurrentQuestionIndex(-1);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Panel Administrateur
        </Typography>

        {!isQuizStarted ? (
          <Paper sx={{ p: 3, mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              En attente de démarrage du quiz
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={resetQuiz}
              sx={{ mt: 3, ml: 2 }}
            >
              Réinitialiser le Quiz
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={startQuiz}
              sx={{ mt: 2 }}
            >
              Démarrer le Quiz
            </Button>
          </Paper>
        ) : (
          <>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6">
                Question {currentQuestionIndex + 1}/{questions.length}
              </Typography>
              {currentQuestionIndex >= 0 && (
                <Typography sx={{ mt: 2 }}>
                  Question en cours: {questions[currentQuestionIndex].text}
                </Typography>
              )}
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Statistiques de la question en cours
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ mb: 1 }}>
                  Réponses totales: {questionStats.total}
                </Typography>
                <Typography sx={{ mb: 1, color: 'success.main' }}>
                  Bonnes réponses: {questionStats.correct} ({questionStats.total > 0 ? Math.round(questionStats.correct / questionStats.total * 100) : 0}%)
                </Typography>
                <Typography sx={{ color: 'error.main' }}>
                  Mauvaises réponses: {questionStats.incorrect} ({questionStats.total > 0 ? Math.round(questionStats.incorrect / questionStats.total * 100) : 0}%)
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={questionStats.total > 0 ? (questionStats.correct / questionStats.total * 100) : 0}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              </Box>
            </Paper>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextQuestion}
                >
                  Question suivante
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEndQuiz}
                >
                  Terminer le quiz
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default AdminView;