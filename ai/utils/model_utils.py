import pickle
import numpy as np

# Load trained AI model from file
def load_model():
    with open("ai/model/investment_model.pkl", "rb") as f:
        model = pickle.load(f)
    return model

# Load scaler from file (for data normalization)
def load_scaler():
    with open("ai/model/scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    return scaler

# Make predictions using the trained model
def predict_stock_price(model, scaler, new_data):
    # Normalize input data
    new_data_scaled = scaler.transform([new_data])

    # Predict stock price
    predicted_price = model.predict(new_data_scaled)
    return predicted_price[0]

