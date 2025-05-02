const { spawn } = require('child_process');
const path = require('path');

/**
 * Calls the Python prediction script with forecast data and returns predictions.
 * @param {Array<Object>} forecastData - Array of objects with keys: temp, clouds, uvi
 * @param {Function} callback - Callback(err, predictions)
 */
const predictEnergy = (forecastData, callback) => {
  // Path to the Python script
  const scriptPath = path.join(__dirname, '../ai-model/predict.py');

  // Serialize data
  const payload = JSON.stringify(forecastData);

  // Spawn the Python process
  const py = spawn('python', [scriptPath, payload]);

  let output = '';
  let errors = '';

  py.stdout.on('data', chunk => output += chunk.toString());
  py.stderr.on('data', chunk => errors += chunk.toString());

  py.on('close', code => {
    if (errors) {
      console.error('Python error:', errors);
      return callback(new Error(errors.trim()));
    }
    try {
      const predictions = JSON.parse(output);
      callback(null, predictions);
    } catch (err) {
      callback(err);
    }
  });

  py.on('error', err => {
    callback(err);
  });
};

module.exports = predictEnergy;
