import React from "react";

const StockCard = ({ stock }) => {
    return (
        <div className="stock-card">
            <h2>{stock.symbol} - {stock.name}</h2>
            <p>Price: ${stock.price}</p>
            <p>Change: {stock.change}%</p>
        </div>
    );
};

export default StockCard;
