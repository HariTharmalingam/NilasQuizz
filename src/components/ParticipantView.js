import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, LinearProgress, Paper } from '@mui/material';
import { socket } from '../services/socket';
import { useQuiz } from '../context/QuizContext';

function ParticipantView() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const quizContext = useQuiz();
  const { currentQuestion, isQuizActive, isQuizEnded, finalStats } = quizContext;

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestion]);

  useEffect(() => {
    if (isQuizEnded) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isQuizEnded]);

  const handleAnswerSubmit = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      socket.emit('submit-answer', {
        answer,
        isCorrect: answer === currentQuestion.correct,
        questionId: currentQuestion.id
      });
    }
  };

  const renderTextOptions = () => (
    <Box sx={{ display: 'grid', gap: 2, mt: 4 }}>
      {currentQuestion.options.map((option, index) => (
        <Button
          key={index}
          variant={selectedAnswer === option ? "contained" : "outlined"}
          onClick={() => handleAnswerSubmit(option)}
          disabled={isAnswered}
          sx={{ 
            height: '60px',
            transition: 'all 0.2s',
            '&:hover': {
              transform: !isAnswered && 'scale(1.02)'
            }
          }}
        >
          {option}
        </Button>
      ))}
    </Box>
  );

  const renderImageOptions = () => (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 2,
      mt: 2
    }}>
      {currentQuestion.options.map((option) => (
        <Box
          key={option.id}
          onClick={() => !isAnswered && handleAnswerSubmit(option.id)}
          sx={{
            cursor: isAnswered ? 'default' : 'pointer',
            border: selectedAnswer === option.id ? '4px solid #1976d2' : '2px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'all 0.2s',
            '&:hover': {
              transform: isAnswered ? 'none' : 'scale(1.02)',
              boxShadow: isAnswered ? 'none' : '0 4px 8px rgba(0,0,0,0.1)'
            }
          }}
        >
          <img
            src={option.image}
            alt={`Option ${option.id}`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              minHeight: '150px'
            }}
          />
        </Box>
      ))}
    </Box>
  );

  // Quiz terminé
  if (isQuizEnded) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              width: '100%',
              textAlign: 'center',
              animation: 'slideDown 0.5s ease-out'
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3
              }}
            >
              Merci d'avoir participé !
            </Typography>

            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Le quiz est maintenant terminé
            </Typography>

            {finalStats && (
              <Box 
                sx={{ 
                  mt: 3,
                  p: 3,
                  bgcolor: 'primary.light',
                  borderRadius: 2,
                  color: 'white'
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Votre score
                </Typography>
                <Typography variant="h4">
                  {finalStats.correct} / {finalStats.total}
                </Typography>
              </Box>
            )}

            <Typography 
              variant="body1"
              sx={{ 
                mt: 4,
                fontStyle: 'italic',
                color: 'text.secondary'
              }}
            >
              À bientôt pour un nouveau quiz !
            </Typography>
          </Paper>
        </Box>

        <style>
          {`
            @keyframes slideDown {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
      </Container>
    );
  }

  // Quiz pas encore démarré
  if (!isQuizActive) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            textAlign: 'center',
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            Bienvenue au Quiz !
          </Typography>
          <Typography variant="h6" gutterBottom color="text.secondary">
            En attente du démarrage du quiz...
          </Typography>
          <LinearProgress sx={{ mt: 4 }} />
        </Box>
      </Container>
    );
  }

  // En attente de question
  if (!currentQuestion) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5">
            En attente de la prochaine question...
          </Typography>
          <LinearProgress sx={{ mt: 4 }} />
        </Box>
      </Container>
    );
  }

  // Affichage de la question
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 4, 
          textAlign: 'center',
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h5" gutterBottom>
          {currentQuestion.text}
        </Typography>

        {currentQuestion.imageOptions ? renderImageOptions() : renderTextOptions()}

        {isAnswered && (
          <Typography 
            sx={{ 
              mt: 2, 
              p: 2,
              bgcolor: 'success.light',
              borderRadius: 1,
              color: 'white'
            }}
          >
            Réponse enregistrée !
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default ParticipantView;