# ai-model/train_model.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from joblib import dump

# Sample dummy data
data = pd.read_csv("solar_data.csv")  # You create this CSV

X = data[["temp", "clouds", "uvi"]]
y = data["output"]

model = RandomForestRegressor()
model.fit(X, y)

dump(model, "solar_predictor.joblib")
