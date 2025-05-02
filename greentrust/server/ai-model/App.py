from flask import Flask, request, jsonify
import joblib
import numpy as np

# Load the trained model
model = joblib.load('energy_price_predictor.pkl')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    energy_amount = data['energyAmount']
    demand_index = data['demandIndex']

    # Predict the price based on the model
    predicted_price = model.predict(np.array([[energy_amount, demand_index]]))[0]

    return jsonify({'predictedPrice': predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
