import './LyricGame.css';
import React, { useState } from 'react';
import SongData from '../components/SongData';


function LyricGame() {
    const [guess, setGuess] = useState('');
    const [decade, setDecade] = useState('');
    const [song, setSong] = useState(null);
    const [artist, setArtist] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [result, setResult] = useState('');

  const startGame = () => {
  let filtered = SongData;

  if (decade) {
    filtered = filtered.filter(song => song.decade === decade);
  }
  if (artist.trim()) {
    filtered = filtered.filter(song =>
      song.artist.toLowerCase().includes(artist.toLowerCase())
    );
  }

  const randomSong = filtered[Math.floor(Math.random() * filtered.length)];
  setSong(randomSong);
  setStartTime(Date.now());
  setGuess('');
  setResult('');
  setTimeTaken(null);
    };

    const checkAnswer = () => {
  const elapsed = (Date.now() - startTime) / 1000;
  setTimeTaken(elapsed.toFixed(1));

  if (guess.trim().toLowerCase() === song.answer.toLowerCase()) {
    setResult('✅ Correct!');
  } else {
    setResult(`❌ Incorrect. The answer was: "${song.answer}"`);
  }
};

return (

  <div className="lyric-game-container">
  <h1>🎮 Lyric Guessing Game</h1>

  <label>Select a decade:</label>
  <select value={decade} onChange={e => setDecade(e.target.value)}>
    <option value="">Any</option>
    <option value="1980s">1980s</option>
    <option value="1990s">1990s</option>
    <option value="2000s">2000s</option>
    <option value="2010s">2010s</option>
  </select>

  <label>Optional: Enter artist</label>
  <input
    type="text"
    placeholder="e.g. Adele"
    value={artist}
    onChange={e => setArtist(e.target.value)}
  />

  <button onClick={startGame}>Start Game</button>

  {song && (
    <div className="game-area">
      <p><strong>Guess the missing word:</strong></p>
      <p className="lyric-question">
        {song.lyric.replace(
          new RegExp(`\\b${song.answer}\\b`, 'i'),
          '_____'
        )}
      </p>

      <input
        type="text"
        placeholder="Your guess"
        value={guess}
        onChange={e => setGuess(e.target.value)}
      />

      <button onClick={checkAnswer}>Submit Guess</button>

      {result && (
        <div className="result">
          <p>{result}</p>
          <p>⏱️ Time taken: {timeTaken} seconds</p>
        </div>
      )}
    </div>
  )}
</div>
);

}

export default LyricGame;