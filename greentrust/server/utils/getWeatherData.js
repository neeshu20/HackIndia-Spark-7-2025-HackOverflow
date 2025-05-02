// utils/getWeatherData.js
const axios = require('axios');

const getWeatherData = async (stationId) => {
    const options = {
      method: 'GET',
      url: 'https://meteostat.p.rapidapi.com/stations/monthly',
      params: {
        station: stationId,
        start: '2020-01-01',
        end: '2020-12-31'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'meteostat.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);  // Check if 'temperature' is in the response
      return response.data;
    } catch (err) {
      console.error('Failed to fetch weather data:', err.message);
      throw err;
    }
  };
  
module.exports = getWeatherData;
