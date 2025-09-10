const CoinSort = ({coinSort, onCoinSortChange}) => {
    return ( 
        <div className="page-controls">
            <label htmlFor="coinSort">Sort by:</label>
            <select value={coinSort} id="coinSort" onChange={(e) => onCoinSortChange(e.target.value)}>
                <option value="price_desc">Price (Descending)</option>
                <option value="price_asc">Price (Ascending)</option>
                <option value="change_desc">Last 24 Hours (Descending)</option>
                <option value="change_asc">Last 24 Hours (Ascending)</option>
            </select>
        </div>
     );
}
 
export default CoinSort;