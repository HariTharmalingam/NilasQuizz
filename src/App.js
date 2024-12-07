import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParticipantView from './components/ParticipantView';
import AdminView from './components/AdminView';
import { QuizProvider } from './context/QuizContext';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/NilasQuizz' : '';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/admin" element={<AdminView />} />
        <Route path="/" element={
          <QuizProvider>
            <ParticipantView />
          </QuizProvider>
        } />
        <Route path="*" element={
          <QuizProvider>
            <ParticipantView />
          </QuizProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;