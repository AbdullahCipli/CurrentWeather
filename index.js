const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.api_key}&units=metric`
    );

    res.json(weatherRes.data);
  } catch (error) {
    res.status(500).json({ error: 'Hata' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
