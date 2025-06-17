const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// ========== ROUTE ==========
app.post('/api/review', async (req, res) => {
  const { artist, title } = req.body;

  if (!artist || !title) {
    return res.status(400).json({ error: 'Artist and song title are required' });
  }

  try {
    // 1. Fetch lyrics using artist and title
    const lyricsRes = await axios.get(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    );

    const lyrics = lyricsRes.data.lyrics;

    if (!lyrics) {
      return res.status(404).json({ error: 'Lyrics not found' });
    }

    // 2. Send lyrics to Groq for review
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'compound-beta-mini',
        messages: [
          {
            role: 'user',
            content: `Write a thoughtful, consise review of the following song lyrics by ${artist} titled "${title}". Please include any interesting insights or observations about the song, including what mood they convey and what is the situation or emotion most listeners listen to this song in:\n\n${lyrics}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const review = groqRes.data.choices?.[0]?.message?.content;

    if (!review) {
      return res.status(500).json({ error: 'Groq did not return a review.' });
    }

    res.json({ lyrics, review });
  } catch (err) {
    console.error('Error:', err.message);
    if (err.response?.data) console.error(err.response.data);
    res.status(500).json({ error: 'We\'re Sorry. Something went wrong. ' + err.message });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
