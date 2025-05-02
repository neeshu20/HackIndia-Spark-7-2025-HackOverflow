# ai-model/predict.py
import os
import sys
import json
import pandas as pd
from joblib import load

try:
    # Model path
    this_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(this_dir, 'solar_predictor.joblib')
    model = load(model_path)

    # Read JSON input from command-line argument
    raw = sys.argv[1] if len(sys.argv) > 1 else '[]'
    input_data = json.loads(raw)

    # Convert to DataFrame
    df = pd.DataFrame(input_data)

    # Validate columns
    required = ['temp', 'clouds', 'uvi']
    if df.empty or not all(col in df.columns for col in required):
        raise ValueError(f"Input data must contain columns: {required}")

    # Predict
    predictions = model.predict(df[required])
    print(json.dumps(predictions.tolist()))

except Exception as e:
    # Print error to stderr for Node.js to capture
    print(str(e), file=sys.stderr)
    sys.exit(1)
