const CoinCard = ({cryptoCoin}) => {
    return ( 
        <div className="card-coin">
            <div className="header-coin">
              <img src={cryptoCoin.image} alt={cryptoCoin.name} className="image-coin" />
              <div>
                <h2>{cryptoCoin.name}</h2>
                <p className="symbol"></p>
              </div>
            </div>
            <p>Price: {cryptoCoin.current_price.toLocaleString()}</p>
            <p className={cryptoCoin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
              {cryptoCoin.price_change_percentage_24h.toFixed(3)}%
            </p>
          </div>
     );
}
 
export default CoinCard;