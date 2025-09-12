import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Spinner from "../components/Spinner";

const API = import.meta.env.VITE_API_COIN;

const CoinInfo = () => {
    const [cryptoCoin, setCryptoCoin] = useState(null);
    const [loader, setLoader] = useState(true);
    const [errorFeedback, setErrorFeedback] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await fetch(`${API}/${id}`);
                if (!response.ok) throw new Error('Data could not be fetched...');
                const data = await response.json();
                console.log(data);
                setCryptoCoin(data);
            } catch (error) {
                console.log(error);
                setErrorFeedback(error);
            } finally {
                setLoader(false);
            }   
        }
        fetchCoin();
    }, [id])

    return (<div className="coin-details-container">
            <Link to="/">Return</Link>
            <h1 className="coin-details-title">
                {cryptoCoin ? `${cryptoCoin.name} (${cryptoCoin.symbol.toUpperCase()})` : 'Coin Details'}
            </h1>
            {loader && <Spinner />}
            {errorFeedback && <div className="errorFeeback">{errorFeedback}</div>}

            {!loader && !errorFeedback && (
                <>
                    <img src={cryptoCoin.image.large} alt={cryptoCoin.name} className="coin-details-image" />
                    <p>{cryptoCoin.description.en.split('. ')[0] + '.'}</p>
                    <div className="coin-details-info">
                        <h3>Current Price: €{cryptoCoin.market_data.current_price.eur.toLocaleString()}</h3>
                        <h3>Market Cap: €{cryptoCoin.market_data.market_cap.eur.toLocaleString()}</h3>
                        <h4>24h High: €{cryptoCoin.market_data.high_24h.eur.toLocaleString()}</h4>
                        <h4>24h Low: €{cryptoCoin.market_data.low_24h.eur.toLocaleString()}</h4>
                        <h4>24h Price Change: €{cryptoCoin.market_data.low_24h.eur.toLocaleString()}</h4>
                        <h4>Total Supply: {cryptoCoin.market_data.total_supply?.toLocaleString() || 'N/A'}</h4>
                        <h4>All-Time High: €{cryptoCoin.market_data.ath.eur.toLocaleString()} on {' '} {new Date(cryptoCoin.market_data.ath_date.eur).toLocaleDateString()}</h4>
                        <h4>All-Time Low: €{cryptoCoin.market_data.atl.eur.toLocaleString()} on {' '} {new Date(cryptoCoin.market_data.atl_date.eur).toLocaleDateString()}</h4>
                    </div>
                    <div className="coin-details-links">
                        {cryptoCoin.links.homepage[0] && (
                            <p>
                                🪙{' '}
                                <a href={cryptoCoin.links.homepage[0]}
                                target="_blank"
                                rel="noopener noreferrer">
                                    Coin's Website
                                </a>
                            </p>
                        )}
                    </div>
                </>
            )}
            {!loader && !errorFeedback && !cryptoCoin && <p>No Data Available</p>}
        </div>
    );
};
 
export default CoinInfo;