import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SongReview from './pages/SongReview';
import LyricGame from './pages/LyricGame';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
      <nav className = "app-nav">
        <Link to="/" style={{ marginRight: '0.8rem' }}>🎵 Review</Link>
        <Link to="/game">🎮 Game</Link>
      </nav>
      <div className="app-content">
      <Routes>
        <Route path="/" element={<SongReview />} />
        <Route path="/game" element={<LyricGame />} />
      </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;