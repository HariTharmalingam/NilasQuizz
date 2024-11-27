import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const QuizGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Questions d'exemple
  const questions = [
    {
      question: "Quelle est la capitale de la France ?",
      options: ["Londres", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    // Ajoutez plus de questions ici
  ];

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameStarted(true);
    }
  };

  const handleAnswer = (optionIndex) => {
    // Logique pour gérer la réponse
    console.log(`${playerName} a choisi l'option ${optionIndex}`);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Bienvenue au Quiz!</h1>
          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Entrez votre nom"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-2"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!playerName.trim()}
            >
              Commencer
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-700 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <h2 className="text-white text-xl">Joueur: {playerName}</h2>
        </div>
        
        <Card className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">
            {questions[currentQuestion].question}
          </h1>
          
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`p-4 h-24 text-lg font-semibold ${
                  index === 0 ? 'bg-red-500 hover:bg-red-600' :
                  index === 1 ? 'bg-blue-500 hover:bg-blue-600' :
                  index === 2 ? 'bg-yellow-500 hover:bg-yellow-600' :
                  'bg-green-500 hover:bg-green-600'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizGame;
