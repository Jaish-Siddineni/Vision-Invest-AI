import mysql.connector
import os

# Load database configuration from environment variables
DATABASE_CONFIG = {
    "host": os.getenv("LAPTOP-269DN1QU", "localhost"),
    "user": os.getenv(" root@localhost", "root"),
    "password": os.getenv("Jaidarash241223!", "root"),
    "database": os.getenv("visioninvest", "visioninvest")
}

def connect_db():
    """Connect to MySQL database and return connection object."""
    try:
        conn = mysql.connector.connect(**DATABASE_CONFIG)
        return conn
    except mysql.connector.Error as e:
        print("Database connection error:", e)
        return None
