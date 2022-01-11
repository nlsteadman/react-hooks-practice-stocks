import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onDelete }) {
  const stockCards = stocks.map(stock => (
    <Stock 
      key={stock.id}
      stock={stock}
      onClick={onDelete}
    />
  ))

  return (
    <div>
      <h2>My Portfolio</h2>
      {stockCards}
    </div>
  );
}

export default PortfolioContainer;
