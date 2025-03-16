import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data))
      .catch((err) => console.error("Error fetching stocks:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Stock Market Overview</h2>
      <div>
        {stocks.map((stock, index) => (
          <div key={index} className="stock-card">
            <h3>{stock.name}</h3>
            <p>Price: ${stock.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
