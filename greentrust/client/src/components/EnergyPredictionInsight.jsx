import React, { useEffect, useState } from 'react';

const EnergyInsights = ({ energyForecast = [] }) => {
  const isValidForecast = Array.isArray(energyForecast) && energyForecast.length > 0;

  console.log('Energy Forecast:', energyForecast); // Debug log

  return (
    <div className="card">
      <h3>🌞 AI-Powered Energy Insights</h3>
      <div>
        <h4>Energy Production Prediction (Next 7 Days)</h4>
        {isValidForecast ? (
          <table className="forecast-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature (°C)</th>
                <th>Cloud Coverage (%)</th>
                <th>UV Index</th>
                <th>Predicted Output (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {energyForecast.map((day, index) => (
                <tr key={index}>
                  <td>{day.date || `Day ${index + 1}`}</td>
                  <td>{day.temp}</td>
                  <td>{day.clouds}</td>
                  <td>{day.uvi}</td>
                  <td>{day.predictedOutput?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading prediction or no data available.</p>
        )}
      </div>
    </div>
  );
};

export default EnergyInsights;
