require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const API_KEYS = process.env.YOUTUBE_API_KEYS.split(',').map(k => k.trim());

function getRandomKey() {
  return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const key = getRandomKey();
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&type=video&q=${encodeURIComponent(query)}&key=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).send('API fetch error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 仙人Tube Running on http://localhost:${PORT}`));
