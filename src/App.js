import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParticipantView from './components/ParticipantView';
import AdminView from './components/AdminView';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Vue Admin sans QuizProvider */}
        <Route path="/admin" element={<AdminView />} />
        
        {/* Vues Participant avec QuizProvider */}
        <Route path="/" element={
          <QuizProvider>
            <ParticipantView />
          </QuizProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;