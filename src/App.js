import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import ParticipantView from './components/ParticipantView';
import AdminView from './components/AdminView';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <QuizProvider>
      <HashRouter>
        <Routes>
          <Route path="/admin" element={<AdminView />} />
          <Route path="/" element={<ParticipantView />} />
        </Routes>
      </HashRouter>
    </QuizProvider>
  );
}

export default App;