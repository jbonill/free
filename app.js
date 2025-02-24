const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const SCRAPER_API_KEY = '296515e2fefd64214469869107dc0115'; // Replace with your actual ScraperAPI key

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.get('/visit', async (req, res) => {
  const targetUrl = 'https://vermillion-rugelach-98a7a5.netlify.app/.netlify/functions/api/'; // Replace with the desired URL
  const scraperUrl = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(targetUrl)}`;
  const requests = Array.from({ length: 1}, () => axios.get(scraperUrl));
  
  try {
    await Promise.all(requests);
    res.json({ message: 'Visited site 3 times in parallel using ScraperAPI' });
  } catch (error) {
    res.status(500).json({ error: 'Error visiting site', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
