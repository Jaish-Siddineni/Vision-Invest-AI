import mysql.connector
from db import connect_db

conn = connect_db()
cursor = conn.cursor()

while True:
    symbol = input("Enter stock symbol (or type 'exit' to quit): ").upper()
    if symbol.lower() == 'exit':
        break
    name = input(f"Enter company name for {symbol}: ")

    cursor.execute(
        "INSERT INTO stocks (symbol, name) VALUES (%s, %s) ON DUPLICATE KEY UPDATE name = VALUES(name)",
        (symbol, name)
    )

conn.commit()
cursor.close()
conn.close()
print("Stock data inserted successfully!")
