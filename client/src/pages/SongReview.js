import React, { useState } from 'react';
import './SongReview.css';

function SongReview() {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!artist.trim() || !title.trim()) return;
    setLyrics('');
    setReview('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artist, title }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setLyrics(data.lyrics);
        setReview(data.review);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      
      <h1>🎵 Song Reviewer</h1>

      <div className="inputs">
  <input
    type="text"
    value={artist}
    onChange={(e) => setArtist(e.target.value)}
    placeholder="Artist (e.g. Adele)"
  />
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Song Title (e.g. Hello)"
  />
  <button onClick={handleSubmit} disabled={loading}>
    {loading ? 'Analyzing...' : 'Generate Review'}
  </button>
</div>

{error && <div className="error">❌ {error}</div>}

<div className="content-area">
  {lyrics && (
    <div className="section">
      <h2>🎶 Lyrics</h2>
      <div className="lyrics">{lyrics}</div>
    </div>
  )}
  {review && (
    <div className="section">
      <h2>🧠 AI Review</h2>
      <div className="review">{review}</div>
    </div>
  )}
    </div>

      </div>
  );
}

export default SongReview;
