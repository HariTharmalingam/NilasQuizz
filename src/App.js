// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticipantView from './components/ParticipantView';
import AdminView from './components/AdminView';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <QuizProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/quiz" element={<ParticipantView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </div>
      </Router>
    </QuizProvider>
  );
}

export default App;