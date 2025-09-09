import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=15&sparkline=false';

const App = () => {
  const [loader, setLoader] = useState(true);
  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [errorFeedback, setErrorFeedback] = useState(null);

  useEffect(() => {
    fetch(API).then((res) => {
      if(!res.ok) throw new Error('Data could not be fetched successfully...');
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setCryptoCoins(data);
      setLoader(false);
    })
    .catch((error) => {
      setErrorFeedback(error.message);
      setLoader(false);
    })
  }, []);

  return ( 
  <div>
    <h1>🪙Cryptic</h1>
    {loader ? <p>Loading...</p> : null}
    {errorFeedback ? <div className="error">{errorFeedback}</div> : null}

    {!loader && !errorFeedback && (
      <main className="grid">
        {cryptoCoins.map((cryptoCoin) => (
          <CoinCard key={cryptoCoin.id} cryptoCoin={cryptoCoin} />
        ))}
      </main>
    )}

  </div> );
}
 
export default App;