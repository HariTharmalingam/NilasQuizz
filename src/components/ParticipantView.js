// src/components/ParticipantView.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Fade, CircularProgress } from '@mui/material';
import { useQuiz } from '../context/QuizContext';
import { socketService } from '../services/socket';

function ParticipantView() {
  const { currentQuestion, isQuizActive } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Réinitialiser l'état quand une nouvelle question arrive
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowFeedback(false);
  }, [currentQuestion]);

  const handleAnswerSubmit = (answer) => {
    if (!isAnswered && isQuizActive) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      
      socketService.submitAnswer({
        answer,
        questionId: currentQuestion?.id,
        timestamp: Date.now()
      });

      // Montrer le feedback
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  if (!isQuizActive) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            En attente du début du quiz...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Fade in={!!currentQuestion} timeout={500}>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {currentQuestion?.text}
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gap: 2, 
            mt: 4,
            '& .MuiButton-root': {
              height: '80px',
              fontSize: '1.2rem'
            }
          }}>
            {currentQuestion?.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "contained" : "outlined"}
                onClick={() => handleAnswerSubmit(option)}
                disabled={isAnswered}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: !isAnswered ? 'scale(1.02)' : 'none'
                  }
                }}
              >
                {option}
              </Button>
            ))}
          </Box>

          <Fade in={showFeedback} timeout={500}>
            <Typography sx={{ mt: 3, color: 'success.main' }}>
              Réponse enregistrée !
            </Typography>
          </Fade>
        </Box>
      </Fade>
    </Container>
  );
}

export default ParticipantView;