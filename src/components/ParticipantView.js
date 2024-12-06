import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { socket } from '../services/socket';

function ParticipantView() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    socket.on('question', (question) => {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setIsAnswered(false);
    });

    return () => socket.off('question');
  }, []);

  const handleAnswerSubmit = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      socket.emit('submit-answer', {
        answer,
        questionId: currentQuestion?.id
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
          sx={{ height: '60px' }}
        >
          {option}
        </Button>
      ))}
    </Box>
  );

  const renderImageOptions = () => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {currentQuestion.options.map((imageUrl, index) => (
        <Grid item xs={6} key={index}>
          <Box
            onClick={() => handleAnswerSubmit(imageUrl)}
            sx={{
              cursor: isAnswered ? 'default' : 'pointer',
              border: selectedAnswer === imageUrl ? '4px solid #1976d2' : '2px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'all 0.2s',
              '&:hover': {
                transform: isAnswered ? 'none' : 'scale(1.02)',
              }
            }}
          >
            <img
              src={imageUrl}
              alt={`Option ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  if (!currentQuestion) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5">
            En attente du début du quiz...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {currentQuestion.text}
        </Typography>
        
        {currentQuestion.imageOptions ? renderImageOptions() : renderTextOptions()}

        {isAnswered && (
          <Typography sx={{ mt: 2, color: 'success.main' }}>
            Réponse enregistrée !
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default ParticipantView;