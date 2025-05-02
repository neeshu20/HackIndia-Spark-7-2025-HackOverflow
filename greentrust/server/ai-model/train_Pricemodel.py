import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load dataset
df = pd.read_csv("energy_price_data.csv")

# Features and target
X = df[['energyAmount', 'demandIndex']]
y = df['pricePerKwh']

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "energy_price_predictor.pkl")

print("Model trained and saved as energy_price_predictor.pkl")
