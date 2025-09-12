import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/home";
import PageNotFound from "./pages/page-not-found";
import About from "./pages/about";
import Header from "./components/Header";
import CoinInfo from "./pages/coin-info";

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

  

  return ( 
    <>
    <Header /> {/*Putting the header above Routes makes it so it's visible on every page. */}
    <Routes>

      <Route path='/' element={
        <Home 
          cryptoCoins={cryptoCoins}
          coinFilter={coinFilter}
          setCoinFilter={setCoinFilter}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
          coinSort={coinSort}
          setCoinSort={setCoinSort}
          loader={loader}
          errorFeedback={errorFeedback}
        />
      } />

      <Route path="/about" element={<About />} />
      <Route path="/coin/:id" element={<CoinInfo />} />
      <Route path="*" element={<PageNotFound />} /> {/*Always put '*' at bottom */}

    </Routes>
    </>
   );
}
 
export default App;