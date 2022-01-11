import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(r => r.json())
      .then(stocks => setStocks(stocks))
  }, []);

  function handleAddStock(newStock) {
    const portfolioAdd = portfolio.find(stock => stock.id === newStock.id)
    if (!portfolioAdd) {
      setPortfolio([ ...portfolio, newStock])
    }
  }

  function handleDeleteStock(removeStock) {
    setPortfolio(portfolio => 
      portfolio.filter(stock => stock.id !== removeStock.id)
    )
  }

  const sortStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filterStocks = sortStocks.filter(
    stock => stock.type === filterBy
  )

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy} 
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks} onAddStock={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onDelete={handleDeleteStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
