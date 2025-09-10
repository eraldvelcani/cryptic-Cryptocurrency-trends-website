const PageLimit = ({pageLimit, onPageLimitChange}) => {
    return ( 
    <div className="page-controls">
        <label htmlFor="pageLimit">Limit per Page: </label>
        <select onChange={(e) => onPageLimitChange(Number(e.target.value))} value={pageLimit} id="pageLimit" >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
      </select>
    </div>
     );
}
 
export default PageLimit;