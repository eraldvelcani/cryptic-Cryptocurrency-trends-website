import { useState, useEffect } from "react";
import CoinSort from "./components/CoinSort";
import CoinFilter from "./components/CoinFilter";
import CoinCard from "./components/CoinCard";
import PageLimit from "./components/PageLimit";

const API = import.meta.env.VITE_API;

const App = () => {
  const [loader, setLoader] = useState(true);
  const [pageLimit, setPageLimit] = useState(15);
  const [coinFilter, setCoinFilter] = useState('');
  const [coinSort, setCoinSort] = useState('price_desc'); 
  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [errorFeedback, setErrorFeedback] = useState(null);

  useEffect(() => {
    fetch(`${API}&order=price_desc&per_page=${pageLimit}&sparkline=false`).then((res) => {
      if(!res.ok) throw new Error('Data could not be fetched successfully...');
      return res.json();
    })
    .then((data) => {
      setCryptoCoins(data);
      setLoader(false);
    })
    .catch((error) => {
      setErrorFeedback(error.message);
      setLoader(false);
    })
  }, [pageLimit]);

  const filteredCoins = cryptoCoins.filter((cryptoCoin) => {
    return cryptoCoin.name.toLowerCase().includes(coinFilter.toLowerCase()) || cryptoCoin.symbol.toLowerCase().includes(coinFilter.toLowerCase()) /* || Add more fields here */
  }).slice() /*Creates new array*/
  .sort((x, y) => {
    switch (coinSort) {
      case 'price_desc':
        return y.current_price - x.current_price;
      case 'price_asc':
        return x.current_price - y.current_price;
      case 'change_desc':
        return y.price_change_percentage_24h - x.price_change_percentage_24h;
      case 'change_asc':
        return x.price_change_percentage_24h - y.price_change_percentage_24h;
    }
  })

  return ( 
  <div>
    <h1>🪙Cryptic</h1>
    {loader ? <p>Loading...</p> : null}
    {errorFeedback ? <div className="error">{errorFeedback}</div> : null}

    <div className="top-controls">
      <CoinFilter coinFilter={coinFilter} onCoinFilterChange={setCoinFilter}/>
      <CoinSort coinSort={coinSort} onCoinSortChange={setCoinSort} />
    </div>

    {!loader && !errorFeedback && (
      <main className="grid">
        {filteredCoins.length > 0 ? filteredCoins.map((cryptoCoin) => (
          <CoinCard key={cryptoCoin.id} cryptoCoin={cryptoCoin} />
        )) : (<p>Coin not found...</p>)}
      </main>
    )}
      <PageLimit pageLimit={pageLimit} onPageLimitChange={setPageLimit} />
      
  </div> );
}
 
export default App;