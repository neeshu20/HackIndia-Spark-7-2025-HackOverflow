// routes/forecast.js
const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/VerifyToken');
const getWeatherData = require('../utils/getWeatherData');
const predictEnergy = require('../utils/predictEnergy');

const router = express.Router();

router.get('/forecast-energy', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || !user.renewableSources.length) {
        return res.status(400).json({ error: 'Renewable source or city not found' });
      }
  
      const stationId = '10637'; // Replace with dynamic lookup if needed
      const weather = await getWeatherData(stationId);

      if (weather && weather.data) {
        const forecast = weather.data.map(month => ({
          temp: month.tavg,             // Use tavg as temperature
          clouds: 100 - (month.tsun / 200) || 0, // Approximate cloudiness: more sunshine = fewer clouds
          uvi: (month.tsun / 1200) || 0         // Approximate UVI: more sunshine = higher UV index
        }));
      
        const validData = forecast.filter(entry =>
          entry.temp !== undefined &&
          entry.clouds !== undefined &&
          entry.uvi !== undefined
        );
      
        if (validData.length === 0) {
          console.error("No valid forecast data to send to Python.");
          return res.status(400).json({ error: "No valid data" });
        }

        // Fetch the user system capacity (kWp)
        const userCapacity = user.capacity || 1; // Default to 1 kWp if not available

        predictEnergy(validData, (err, predictions) => {
          if (err) return res.status(500).json({ error: 'Prediction failed' });

          // Adjust the predictions based on the user's system capacity
          const fullForecast = validData.map((month, i) => ({
            ...month,
            predictedOutput: predictions[i] * userCapacity // Multiply by user's system capacity (kWp)
          }));

          res.json({ forecast: fullForecast });
        });
      } else {
        res.status(400).json({ error: 'No forecast data available' });
      }
  
    } catch (error) {
      console.error('Forecast Error:', error.message);
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});


module.exports = router;
