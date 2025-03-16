import pandas as pd
import numpy as np
import psycopg2
from sklearn.preprocessing import MinMaxScaler

# Connect to PostgreSQL Database
def connect_db():
    return psycopg2.connect(
        database="visioninvest",
        user="your_user",
        password="your_password",
        host="localhost",
        port="5432"
    )

# Fetch stock data from database
def fetch_stock_data():
    conn = connect_db()
    cursor = conn.cursor()
    query = "SELECT date, open, high, low, close, volume FROM stock_data ORDER BY date ASC;"
    cursor.execute(query)
    data = cursor.fetchall()
    conn.close()

    # Convert data to Pandas DataFrame
    columns = ['date', 'open', 'high', 'low', 'close', 'volume']
    df = pd.DataFrame(data, columns=columns)
    df.set_index('date', inplace=True)
    return df

# Prepare dataset for training/testing
def prepare_data(df):
    df['target'] = df['close'].shift(-1)  # Predict next day's closing price
    df.dropna(inplace=True)

    X = df[['open', 'high', 'low', 'close', 'volume']]
    y = df['target']

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler

# Normalize new data before making predictions
def normalize_new_data(data, scaler):
    return scaler.transform(data)

