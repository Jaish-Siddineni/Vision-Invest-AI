import pickle
import numpy as np
from ai.db.db import connect_db

# Load trained model and scaler
with open("ai/model/investment_model.pkl", "rb") as f:
    model = pickle.load(f)
with open("ai/model/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

def fetch_latest_stock_data(stock_symbol):
    """Fetch latest stock data from MySQL for real-time prediction."""
    conn = connect_db()
    if conn is None:
        return None

    query = f"SELECT open_price, high_price, low_price, volume FROM historical_data WHERE stock_symbol = '{stock_symbol}' ORDER BY date DESC LIMIT 1"
    cursor = conn.cursor()
    cursor.execute(query)
    row = cursor.fetchone()
    conn.close()

    if row:
        return np.array(row).reshape(1, -1)
    return None

def predict_stock_price(stock_symbol):
    """Make stock price prediction for given stock symbol."""
    stock_data = fetch_latest_stock_data(stock_symbol)
    if stock_data is None:
        return None

    stock_data_scaled = scaler.transform(stock_data)
    predicted_price = model.predict(stock_data_scaled)
    return predicted_price[0]
