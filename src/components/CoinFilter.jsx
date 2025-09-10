const CoinFilter = ({coinFilter, onCoinFilterChange}) => {
    return ( 
        <div className="coin-filter">
            <input onChange={(e) => onCoinFilterChange(e.target.value)} type="text" placeholder="Filter Coins..." value={coinFilter} />
        </div>
     );
}
 
export default CoinFilter;