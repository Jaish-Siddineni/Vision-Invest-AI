import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestRegressor
from ai.db.db import connect_db

# Connect to MySQL and fetch stock data
def fetch_stock_data():
    conn = connect_db()
    if conn is None:
        return None

    query = "SELECT date, open_price, high_price, low_price, close_price, volume FROM historical_data WHERE stock_symbol = 'AAPL'"
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# Prepare dataset for AI training
df = fetch_stock_data()
if df is not None:
    df["date"] = pd.to_datetime(df["date"])
    df.set_index("date", inplace=True)

    # Feature engineering
    df["price_change"] = df["close_price"] - df["open_price"]
    df["volatility"] = df["high_price"] - df["low_price"]

    # Select features and target variable
    X = df[["open_price", "high_price", "low_price", "volume", "price_change", "volatility"]]
    y = df["close_price"]

    # Normalize data
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    # Train AI model
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save trained model and scaler
    with open("ai/model/investment_model.pkl", "wb") as f:
        pickle.dump(model, f)
    with open("ai/model/scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)

    print("AI investment model trained and saved!")
